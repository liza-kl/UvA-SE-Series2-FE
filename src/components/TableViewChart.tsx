import { Table } from '@geist-ui/core';

export interface TableRowProps {
  property?: string | any;
  value?: number | string | any;
  description?: string;
}
type TableViewChartProps = {
  data: TableRowProps[];
};

export const TableViewChart = ({ data }: TableViewChartProps) => {
  const descriptionNeeded = (): boolean => {
    return data.some((elem) => elem.description != undefined);
  };
  return (
    <Table data={data}>
      <Table.Column prop="property" label="property" />
      <Table.Column prop="value" label="value" />
      {descriptionNeeded() && (
        <Table.Column prop="description" label="description" />
      )}
    </Table>
  );
};
