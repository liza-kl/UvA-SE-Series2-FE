import { Code, Link, Text } from '@geist-ui/core';
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

export const DependencyWheelChart = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [showTable, setShowTable] = useState(false);
  const [tableValues, setTableValues] = useState<TableRowProps[][]>();

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
      pointFormat:
        '<b> {point.filename}</b> {point.from}{point.fromLines} → <br></br> {point.to}-{point.toLines}, {point.filename}'
    },
    plotOptions: {
      dependencywheel: {
        // shared options for all dependencywheel series
        allowPointSelect: true,

          point: {
            events: {
              click:  function ()  {
                
                setTableValues([[
                {
                  property: 'Clone Location',
                  value: <Link target="_blank" href={'file://' + this.from + ":" + this.fromLine + ":" + "1"} icon color>{this.from}</Link>
                },
                {
                  property: 'Code Lines',
                  value: this.fromLines
                },
                {
                  property: 'clone content',
                  value: <Code block>{this.fromClone}</Code>
                },
               
              ],
              [
                {
                  property: 'Clone Location',
                  value: <Link target="_blank" href={'file://' + this.to + ":" + this.toLine + ":" + "1"} icon color>{this.to}</Link>
                },
                {
                  property: 'Code Lines',
                  value: this.toLines
                },
                {
                  property: 'clone content',
                  value: <Code block>{this.toClone}</Code>
                },
               
              ]]);
              setShowTable(true);
            
            
            }
            }
          },
        series: {
          lineWidth: 1,
        }
      }

      
    },

    series: [
      {
        ...data,
        type: 'dependencywheel',
        name: 'Duplications',
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
      />
     {showTable && <><Text>Clones in Detail</Text>
     {tableValues.map((value, idx) => 
     <>
     <TableViewChart data={value} key={idx}/>
     </>)}
     </>}
    </>
  );
};
