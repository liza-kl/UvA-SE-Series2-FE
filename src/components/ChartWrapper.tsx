import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import { useRef } from 'react';
import { CircleViewDataStructure } from './ChartWrapper.types';

// Load Highcharts modules

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.
HC_more(Highcharts); //init module
interface ChartWrapperProps {
  chartType: unknown;
  subtitle?: string;
  customChartOptions?: HighchartsReact.Props;
  data: CircleViewDataStructure[];
}

export const ChartWrapper = ({
  chartType,
  data,
  customChartOptions,
  subtitle = ''
}: ChartWrapperProps) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const genericChartOptions = {
    chart: {
      type: chartType,
      height: '80%'
    },
    title: {
      text: subtitle
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.y}</sub>'
    },
    /* @ts-ignore */
    series: data.data
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={Highcharts.merge(genericChartOptions, customChartOptions)}
      ref={chartComponentRef}
    />
  );
};
