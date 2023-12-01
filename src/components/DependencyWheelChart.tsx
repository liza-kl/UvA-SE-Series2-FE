import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import dependencywheel from 'highcharts/modules/dependency-wheel.js'; //module
import sankey from 'highcharts/modules/sankey.js';
import { useEffect, useRef, useState } from 'react';
import { TableRowProps, TableViewChart } from './TableViewChart';

// Load Highcharts modules
HC_more(Highcharts); //init module
sankey(Highcharts);
dependencywheel(Highcharts);

export const DependencyWheelChart = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [showTable, setShowTable] = useState(false);
  const [tableValues, setTableValues] = useState<TableRowProps[]>();

  useEffect(() => {
    setTableValues(tableValues);
  }, [tableValues]);

  const chartOptions = {
    chart: {
      height: '50%'
    },
    title: {
      text: ''
    },

    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.y}, {point.filename}</sub>'
    },
    plotOptions: {
      dependencywheel: {
        // shared options for all dependencywheel series
        series: {
          lineWidth: 1
        }
      }
    },

    series: [
      {
        nodes: [
          {
            nodeWidth: 0.25,
            name: 'ungabunga',
            id: '/test',
            colorIndex: 1
          },
          {
            nodeWidth: 0.5,
            id: '/public',
            colorIndex: 3
          }
        ],
        keys: ['from', 'to', 'weight', 'name'],
        data: [['/test', '/public', 1, 'TestFile2.Java']],
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
          distance: 0
        },
        size: '95%'
      }
    ]
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartComponentRef}
        {...props}
      />
      <TableViewChart data={[{ property: '', value: '' }]} />
    </>
  );
};
