import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import { useRef } from 'react';

// Load Highcharts modules

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.
HC_more(Highcharts); //init module

export const DependencyWheelChart = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const chartOptions = {
    chart: {
      height: '80%'
    },
    title: {
      text: ''
    },
    subTitle: {
      text: 'Coffee consumption'
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.y}</sub>'
    },
    plotOptions: {
      dependencywheel: {
        // shared options for all dependencywheel series
      }
    },
    series: [
      {
        type: 'dependencywheel'
      }
    ]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartComponentRef}
      {...props}
    />
  );
};
