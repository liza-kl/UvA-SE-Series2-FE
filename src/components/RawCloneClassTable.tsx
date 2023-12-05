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

const getOnlyFileName = (fullPath: string) => {
  const path = fullPath;
  const lastIndex = path.lastIndexOf('/');
  const result = path.substring(lastIndex + 1);

  return result;
};

const getCodeComponent = (cloneClass, idx, i, setI) => {
  return (
    <Collapse
      key={idx}
      title={`${idx.toString()} – Expand for example clone`}
      style={{ width: '100%', borderTop: '0', borderBottom: '0' }}
    >
      <>
        <ButtonGroup scale={2 / 3}>
          <Button scale={2 / 3} disabled={i == 0} onClick={() => setI(i - 1)}>
            Show Previous Clone
          </Button>
          <Button
            scale={2 / 3}
            type="success"
            disabled={i == cloneClass.length - 1}
            onClick={() => setI(i + 1)}
          >
            Show Next Clone
          </Button>
        </ButtonGroup>
        <Code
          block
          name={`${getOnlyFileName(cloneClass[i].filePath)}:${
            cloneClass[i].startLine
          }:${cloneClass[i].endLine}`}
        >
          {atob(cloneClass[i].base64Content)}
        </Code>
      </>
    </Collapse>
  );
};

const getCloneClassCells = (cloneClasses: NodeItem[]): RawCloneClassCell[] => {
  const data: RawCloneClassCell[] = [];

  const [i, setI] = useState(0);

  cloneClasses.map((cloneClass, idx) => {
    data.push({
      cloneClassID: getCodeComponent(cloneClass, idx, i, setI),
      numFiles: cloneClass.map((elem) => {
        return (
          <React.Fragment>
            <Link
              style={{ display: 'block', padding: '4px' }}
              key={elem.filePath}
              target="_blank"
              href={
                'vscode://file' +
                elem.filePath +
                ':' +
                elem.startLine +
                ':' +
                '1'
              }
              icon
              color
            >
              <Tooltip text={elem.filePath}>
                {getOnlyFileName(elem.filePath)}:{elem.startLine}:{elem.endLine}
              </Tooltip>
            </Link>
            {/* Add line break except for the last element */}
          </React.Fragment>
        );
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
      <Table.Column prop="cloneClassID" label="Clone Class ID" width={30} />
      <Table.Column prop="numFiles" label="Contained Locations" width={20} />
    </Table>
  );
};
