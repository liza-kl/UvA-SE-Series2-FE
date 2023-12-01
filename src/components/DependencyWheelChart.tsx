import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import dependencywheel from 'highcharts/modules/dependency-wheel.js'; //module
import sankey from 'highcharts/modules/sankey.js';
import { useRef } from 'react';

// Load Highcharts modules
HC_more(Highcharts); //init module
sankey(Highcharts);
dependencywheel(Highcharts);

export const DependencyWheelChart = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const chartOptions = {
    chart: {
      height: '80%'
    },
    title: {
      text: ''
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
        keys: ['from', 'to', 'weight'],
        data: [
          ['Brazil', 'Portugal', 5],
          ['Brazil', 'France', 1],
          ['Brazil', 'Spain', 1],
          ['Brazil', 'England', 1],
          ['Canada', 'Portugal', 1],
          ['Canada', 'France', 5],
          ['Canada', 'England', 1],
          ['Mexico', 'Portugal', 1],
          ['Mexico', 'France', 1],
          ['Mexico', 'Spain', 5],
          ['Mexico', 'England', 1],
          ['USA', 'Portugal', 1],
          ['USA', 'France', 1],
          ['USA', 'Spain', 1],
          ['USA', 'England', 5],
          ['Portugal', 'Angola', 2],
          ['Portugal', 'Senegal', 1],
          ['Portugal', 'Morocco', 1],
          ['Portugal', 'South Africa', 3],
          ['France', 'Angola', 1],
          ['France', 'Senegal', 3],
          ['France', 'Mali', 3],
          ['France', 'Morocco', 3],
          ['France', 'South Africa', 1],
          ['Spain', 'Senegal', 1],
          ['Spain', 'Morocco', 3],
          ['Spain', 'South Africa', 1],
          ['England', 'Angola', 1],
          ['England', 'Senegal', 1],
          ['England', 'Morocco', 2],
          ['England', 'South Africa', 7],
          ['South Africa', 'China', 5],
          ['South Africa', 'India', 1],
          ['South Africa', 'Japan', 3],
          ['Angola', 'China', 5],
          ['Angola', 'India', 1],
          ['Angola', 'Japan', 3],
          ['Senegal', 'China', 5],
          ['Senegal', 'India', 1],
          ['Senegal', 'Japan', 3],
          ['Mali', 'China', 5],
          ['Mali', 'India', 1],
          ['Mali', 'Japan', 3],
          ['Morocco', 'China', 5],
          ['Morocco', 'India', 1],
          ['Morocco', 'Japan', 3],
          ['Japan', 'Brazil', 1]
        ],
        type: 'dependencywheel',
        name: 'Dependency wheel series',
        dataLabels: {
          color: '#333',
          style: {
            textOutline: 'none'
          },
          textPath: {
            enabled: true
          },
          distance: 10
        },
        size: '95%'
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
