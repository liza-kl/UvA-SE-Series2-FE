import { Table } from '@geist-ui/core';

export interface TableRowProps {
  property?: string | any;
  value?: number | string | any;
}
type TableViewChartProps = {
  data: TableRowProps[];
};

export const TableViewChart = ({ data }: TableViewChartProps) => {
  return (
    <Table data={data}>
      <Table.Column prop="property" label="property" />
      <Table.Column prop="value" label="value" />
    </Table>
  );
};
