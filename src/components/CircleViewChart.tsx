import { useEffect, useState } from 'react';
import { ChartWrapper } from './ChartWrapper';
import { CircleViewDataStructure } from './ChartWrapper.types';
import { TableRowProps, TableViewChart } from './TableViewChart';

export const CircleViewChart = (data: CircleViewDataStructure[]) => {
  const [showTable, setShowTable] = useState(false);
  const [tableValues, setTableValues] = useState<TableRowProps[]>();

  useEffect(() => {
    setTableValues(tableValues);
  }, [tableValues]);

  return (
    <>
      <ChartWrapper
        data={data}
        chartType="packedbubble"
        customChartOptions={{
          plotOptions: {
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click: function () {
                    /*@ts-ignore */
                    if (this.formatPrefix == 'parentNode') return;
                    /*@ts-ignore */
                    setTableValues([{ property: 'test', value: this.y }]);
                    setShowTable(true);
                  }
                }
              }
            },
            packedbubble: {
              minSize: '20%',
              maxSize: '100%',
              zMin: 0,
              zMax: 1000,
              layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: true,
                parentNodeLimit: true
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                  property: 'y',
                  operator: '>',
                  value: 250
                },
                style: {
                  color: 'black',
                  textOutline: 'none',
                  fontWeight: 'normal'
                }
              }
            }
          }
        }}
      />
      {showTable && <TableViewChart data={tableValues!} />}
    </>
  );
};
