import {
  Button,
  ButtonGroup,
  Code,
  Collapse,
  Link,
  Table,
  Tooltip
} from '@geist-ui/core';
import * as React from 'react';
import { useState } from 'react';
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

const getVSCodeLinkComponent = (elem: NodeItem, toolTip: boolean = false) => {
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
          ) : (
            `${getOnlyFileName(elem.filePath)}:${elem.startLine}:${
              elem.endLine
            }`
          )}
        </Link>
        {/* Add line break except for the last element */}
      </React.Fragment>
    )
  );
};

const getCloneClassCells = (cloneClasses: NodeItem[]): RawCloneClassCell[] => {
  const data: RawCloneClassCell[] = [];
  const cloneClassMap = new Map<number, number>([]);

  const [enhancedI, setEnhancedI] = useState<any>(
    cloneClasses.map((_, idx) => {
      cloneClassMap.set(idx, 0);
      setEnhancedI(cloneClassMap);
    })
  );

  const updateCollapseIndex = (value, idx) => {
    setEnhancedI((prevList) => {
      console.log('prev lit', prevList);
      const updatedValues = new Map(prevList);
      updatedValues.set(idx, updatedValues.get(idx) + value);
      console.log('updated list', updatedValues);
    });
  };

  React.useEffect(() => {
    cloneClasses.map((_, idx) => {
      cloneClassMap.set(idx, 0);
      setEnhancedI(cloneClassMap);
    });
  }, []);

  console.log(enhancedI);
  enhancedI != undefined &&
    cloneClasses.map((cloneClass, idx) => {
      console.log(cloneClass[enhancedI.get(idx)]);
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
                  name={getVSCodeLinkComponent(
                    cloneClass[enhancedI.get(idx)],
                    false
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
  const data = getCloneClassCells(cloneClasses);
  return (
    <Table data={data}>
      <Table.Column prop="cloneClassID" label="Clone Class ID" width={50} />
      <Table.Column prop="numFiles" label="Contained Locations" width={50} />
    </Table>
  );
};
