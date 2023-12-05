import { Button, Code, Collapse, Link, Table } from '@geist-ui/core';
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
    <Collapse key={idx} title={`${idx.toString()} – Expand for example clone`}>
      <>
        <Code
          block
          name={`${getOnlyFileName(cloneClass[i].filePath)}:${
            cloneClass[i].startLine
          }:${cloneClass[i].endLine}`}
        >
          {atob(cloneClass[i].base64Content)}
        </Code>
        <Button disabled={i == 0} onClick={() => setI(i - 1)}>
          Show Previous Clone
        </Button>
        <Button
          disabled={i == cloneClass.length - 1}
          onClick={() => setI(i + 1)}
        >
          Show Next Clone
        </Button>
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
          <>
            <Link
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
              {getOnlyFileName(elem.filePath)}:{elem.startLine}:{elem.endLine}
            </Link>
          </>
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
      <Table.Column prop="cloneClassID" label="Clone Class ID" />
      <Table.Column prop="numFiles" label="Contained Files" />
      <Table.Column prop="duplicatedLines" label="Duplicated Lines" />
    </Table>
  );
};
