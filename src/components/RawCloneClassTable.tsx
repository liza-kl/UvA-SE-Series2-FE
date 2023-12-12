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
import { useEffect, useState } from 'react';
import { NodeItem } from './util';

type RawCloneClassTableProps = {
  cloneClasses: NodeItem[];
};

type RawCloneClassCell = {
  cloneClassID: any;
  numFiles: any;
  duplicatedLines: any;
};

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

const getCloneClassCells = (cloneClasses: NodeItem[]): RawCloneClassCell[] => {
  const data: RawCloneClassCell[] = [];

  const [enhancedI, setEnhancedI] = useState<Map<number, number>>(() => {
    const initialMap = new Map<number, number>();
    cloneClasses.forEach((_, idx) => {
      initialMap.set(idx, 0);
    });
    return initialMap;
  });

  const updateCollapseIndex = (value, idx) => {
    setEnhancedI((prevList) => {
      const updatedValues = new Map(prevList);
      updatedValues.set(idx, updatedValues.get(idx) + value);
      return updatedValues; // Make sure to return the updated values
    });
  };

  React.useEffect(() => {
    const initialMap = new Map<number, number>();
    cloneClasses.forEach((_, idx) => {
      initialMap.set(idx, 0);
    });
    setEnhancedI(initialMap);
  }, []);

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
  const initialData = getCloneClassCells(cloneClasses);
  const [data, setData] = useState(initialData);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const filteredData = initialData.filter((cloneClass) => {
      const matchingFiles = cloneClass.numFiles.filter((file) =>
        file.props.children.key
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
      return matchingFiles.length > 0; // Include clone class if any matching files are found
    });

    setData(filteredData);
  }, [searchInput]);

  return (
    <>
      <Grid.Container
        gap={2}
        alignItems="center"
        alignContent="center"
        justify="space-between"
      >
        <Grid xs={22}>
          {/* @ts-ignore */}
          <Input
            placeholder="Filter Files"
            width="100%"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            mb="10px"
          />
        </Grid>
        <Grid xs={2}>
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
