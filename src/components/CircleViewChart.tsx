import { useEffect, useState } from 'react';
import { ChartWrapper } from './ChartWrapper';
import { TableRowProps, TableViewChart } from './TableViewChart';

export const CircleViewChart = (data) => {
  const [showTable, setShowTable] = useState(false);
  const [tableValues, setTableValues] = useState<TableRowProps[]>();

  useEffect(() => {
    setTableValues(tableValues);
  }, [tableValues]);

  const dataValues = data.data.map((elem) => elem.data);

  return (
    <>
      <ChartWrapper
        data={data}
        chartType="packedbubble"
        customChartOptions={{
          plotOptions: {
            series: {
              color: '#d3d3d3',
              lineWidth: 1,
              states: {
                hover: {
                  enabled: false
                }
              },
              cursor: 'pointer',
              panning: false,
              point: {
                events: {
                  click: function () {
                    /*@ts-ignore */
                    if (this.formatPrefix == 'parentNode') return;

                    dataValues.map((elem) => {
                      elem
                        .filter((elem) => elem.name != this.name)
                        .map((elem) => (elem.color = '#d3d3d3'));

                      elem
                        .filter((elem) => elem.name == this.name)
                        // TODO Create mapping between clone types
                        .map((elem) => (elem.color = 'blue'));
                    });
                    /*@ts-ignore */
                    setTableValues([
                      {
                        property: 'file path',
                        value: this.filePath
                      },
                      {
                        property: 'method name',
                        value: this.name
                      },
                      {
                        property: 'start line',
                        value: this.startLine
                      },
                      {
                        property: 'end line ',
                        value: this.endLine
                      },
                      {
                        property: 'type ',
                        value: this.cloneType
                      }
                    ]);
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
              series: {
                animation: false
              },
              layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: false,
                parentNodeLimit: true,
                enableSimulation: false
              },

              dataLabels: {
                enabled: true,
                format: '{point.name}',
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
