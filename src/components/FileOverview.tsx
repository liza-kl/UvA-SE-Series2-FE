import { Text } from '@geist-ui/core';
import { TableViewChart } from './TableViewChart';

export const FileOverview = ({ data }) => {
  return (
    <>
      <Text h2>Files with most clones</Text>
      <TableViewChart data={data} />
    </>
  );
};
