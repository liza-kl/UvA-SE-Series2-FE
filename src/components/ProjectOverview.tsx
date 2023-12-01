import { Table } from '@geist-ui/core';

export interface CircleViewRowProps {
  targetProject: string;
  targetMethod: string;
  type1?: string;
  type2?: string;
  type3?: string;
}
type CircleViewTableProps = {
  data: CircleViewRowProps[];
};

export const CircleViewTable = ({ data }: CircleViewTableProps) => {
  return (
    <Table data={data}>
      <Table.Column prop="targetProject" label="Target Project" />
      <Table.Column prop="targetMethod" label="Target Method" />
      <Table.Column prop="locations" label="Locations of target method" />
      <Table.Column prop="type1" label="#Type 1" />
      <Table.Column prop="type2" label="#Type 2" />
      <Table.Column prop="type3" label="#Type 3" />
    </Table>
  );
};
