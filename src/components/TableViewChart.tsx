import { Table } from '@geist-ui/core';

interface TableRowProps {
  property: string;
  value: number | string;
  description?: string;
}
type TableViewChartProps = {
  data: TableRowProps[];
};
export const TableViewChart = ({ data }: TableViewChartProps) => {
  return (
    <Table data={data}>
      <Table.Column prop="property" label="property" />
      <Table.Column prop="value" label="value" />
      <Table.Column prop="description" label="description" />
    </Table>
  );
};
