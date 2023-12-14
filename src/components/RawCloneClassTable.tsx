import {
  Button,
  ButtonGroup,
  Code,
  Collapse,
  Grid,
  Input,
  Link,
  Table,
  Tag,
  Tooltip
} from '@geist-ui/core';
import * as React from 'react';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  RawCloneClassCell,
  RawCloneClassTableProps
} from './RawCloneClassTable.types';
import { NodeItem } from './util';

export const getOnlyFileName = (fullPath: string) => {
  const path = fullPath;
  const lastIndex = path.lastIndexOf('/');
  const result = path.substring(lastIndex + 1);

  return result;
};

const getVSCodeLinkComponent = (
  elem: NodeItem,
  toolTip: boolean = false,
  longName: boolean = false
) => {
  return (
    elem != undefined && (
      <React.Fragment>
        <Link
          style={{ display: 'block', padding: '4px' }}
          key={elem.filePath}
          target="_blank"
          href={
            'vscode://file' + elem.filePath + ':' + elem.startLine + ':' + '1'
          }
          icon
          color
        >
          {toolTip ? (
            <Tooltip text={elem.filePath}>
              {getOnlyFileName(elem.filePath)}:{elem.startLine}:{elem.endLine}
            </Tooltip>
          ) : longName == false ? (
            `${getOnlyFileName(elem.filePath)}:${elem.startLine}:${
              elem.endLine
            }`
          ) : (
            `${elem.filePath}:${elem.startLine}:${elem.endLine}`
          )}
        </Link>
      </React.Fragment>
    )
  );
};

const getCloneClassCells = (
  cloneClasses: NodeItem[],
  updateCollapseIndex,
  enhancedI
): RawCloneClassCell[] => {
  const data: RawCloneClassCell[] = [];

  enhancedI != undefined &&
    cloneClasses.map((cloneClass, idx) => {
      cloneClass[enhancedI.get(idx)] != undefined &&
        data.push({
          cloneClassID: (
            <Collapse
              key={idx}
              title={`${idx.toString()} – Expand for example clone`}
              style={{ borderTop: '0', borderBottom: '0' }}
            >
              <>
                <ButtonGroup scale={2 / 3}>
                  <Button
                    scale={2 / 3}
                    onClick={() => updateCollapseIndex(-1, idx)}
                    disabled={enhancedI.get(idx) == 0}
                  >
                    Show Previous Clone
                  </Button>
                  <Button
                    scale={2 / 3}
                    type="success"
                    disabled={enhancedI.get(idx) == cloneClass.length - 1}
                    onClick={() => updateCollapseIndex(1, idx)}
                  >
                    Show Next Clone
                  </Button>
                </ButtonGroup>
                <Code
                  block
                  /* @ts-ignore */
                  name={getVSCodeLinkComponent(
                    cloneClass[enhancedI.get(idx)],
                    false,
                    true
                  )}
                  width={50}
                >
                  {atob(cloneClass[enhancedI.get(idx)].base64Content)}
                </Code>
              </>
            </Collapse>
          ),
          numFiles: cloneClass.map((elem) => {
            return getVSCodeLinkComponent(elem, true);
          }),
          duplicatedLines: cloneClass.map((elem) => {
            Number(elem.endLine) - Number(elem.startLine);
          })
        });
    });
  return data;
};

export const RawCloneClassTable = ({
  cloneClasses
}: RawCloneClassTableProps) => {
  const [enhancedI, setEnhancedI] = useState<Map<number, number>>(() => {
    const initialMap = new Map<number, number>();
    cloneClasses.forEach((_, idx) => {
      initialMap.set(idx, 0);
    });
    return initialMap;
  });

  const [data, setData] = useState<RawCloneClassCell[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState<NodeItem[]>(cloneClasses);

  const updateCollapseIndex = React.useCallback((value, idx) => {
    setEnhancedI((prevList) => {
      const updatedValues = new Map(prevList);
      updatedValues.set(idx, updatedValues.get(idx) + value);
      return updatedValues;
    });
  }, []);

  const getCloneClassCellsData = React.useCallback(() => {
    return getCloneClassCells(filteredData, updateCollapseIndex, enhancedI);
  }, [filteredData, updateCollapseIndex, enhancedI]);

  useDeepCompareEffect(() => {
    const filteredResult = cloneClasses.filter((cloneClass) => {
      const matchingFiles = cloneClass.filter((file) =>
        file.filePath.toLowerCase().includes(searchInput.toLowerCase())
      );
      return matchingFiles.length > 0;
    });

    setFilteredData(filteredResult);
  }, [searchInput, cloneClasses]);

  React.useEffect(() => {
    const initialMap = new Map<number, number>();
    cloneClasses.forEach((_, idx) => {
      initialMap.set(idx, 0);
    });
    setEnhancedI(initialMap);
  }, [cloneClasses]);

  React.useEffect(() => {
    const initialData = getCloneClassCellsData();
    setData(initialData);
  }, [getCloneClassCellsData]);

  React.useEffect(() => {
    // Reset enhancedI when filtered data changes to prevent inconsistency
    setEnhancedI((prevList) => {
      const updatedValues = new Map(prevList);
      filteredData.forEach((_, idx) => {
        if (!updatedValues.has(idx)) {
          updatedValues.set(idx, 0);
        }
      });
      return updatedValues;
    });
  }, [filteredData]);
  return (
    <>
      <Grid.Container
        gap={2}
        alignItems="center"
        alignContent="center"
        justify="space-between"
      >
        <Grid xs={20}>
          {/* @ts-ignore */}
          <Input
            placeholder="Filter Files"
            width="100%"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            mb="10px"
          />
        </Grid>
        <Grid xs={4}>
          <Tag type="default" invert>
            Clone Classes: {data.length}
          </Tag>
        </Grid>
      </Grid.Container>

      <Table data={data}>
        <Table.Column prop="cloneClassID" label="Clone Class ID" width={50} />
        <Table.Column prop="numFiles" label="Contained Locations" width={50} />
      </Table>
    </>
  );
};
