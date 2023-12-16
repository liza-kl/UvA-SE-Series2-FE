import { Button, Code, Link, Text } from '@geist-ui/core';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import dependencywheel from 'highcharts/modules/dependency-wheel.js'; //module
import sankey from 'highcharts/modules/sankey.js';
import { useEffect, useRef, useState } from 'react';
import { FileOverview } from './FileOverview';
import { TableRowProps, TableViewChart } from './TableViewChart';

// Load Highcharts modules
HC_more(Highcharts); //init module
sankey(Highcharts);
dependencywheel(Highcharts);

export const DependencyWheelChart = ({ data }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [showTable, setShowTable] = useState(false);
  const [tableValues, setTableValues] = useState<TableRowProps[][]>();
  const [showOverview, setShowOverview] = useState<boolean>(true);
  const [overviewTableValues, setOverviewTableValues] =
    useState<TableRowProps[]>();

  useEffect(() => {
    setTableValues(tableValues);
  }, [tableValues]);

  useEffect(() => {
    let nodeScores = [];
    /* @ts-ignore */
    chartComponentRef.current.chart.series[0].nodes.map((elem) => {
      nodeScores.push({
        file: elem['id'],
        duplicatedLines: elem['sum']
      });
    });

    nodeScores.sort((a, b) => b.duplicatedLines - a.duplicatedLines);

    setOverviewTableValues(
      nodeScores.map((nodeScore) => {
        return {
          property: nodeScore.file,
          value: nodeScore.duplicatedLines
        };
      })
    );
    setShowOverview(true);
  }, []);

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
        nodeWidth: 20,
        minLinkWidth: 2,
        allowPointSelect: true,
        point: {
          events: {
            click: function () {
              if (this.formatPrefix == 'point') {
                setShowOverview(false);
                setTableValues([
                  [
                    {
                      property: 'Clone Location',
                      value: (
                        <Link
                          target="_blank"
                          href={
                            'vscode://file' +
                            this.from +
                            ':' +
                            this.fromLine +
                            ':' +
                            '1'
                          }
                          icon
                          color
                        >
                          {this.from}
                        </Link>
                      )
                    },
                    {
                      property: 'Code Lines',
                      value: this.fromLines
                    },
                    {
                      property: 'clone content',
                      value: (
                        <Code block width="50">
                          {this.fromClone}
                        </Code>
                      )
                    }
                  ],
                  [
                    {
                      property: 'Clone Location',
                      value: (
                        <Link
                          target="_blank"
                          href={
                            'vscode://file' +
                            this.to +
                            ':' +
                            this.toLine +
                            ':' +
                            '1'
                          }
                          icon
                          color
                        >
                          {this.to}
                        </Link>
                      )
                    },
                    {
                      property: 'Code Lines',
                      value: this.toLines
                    },
                    {
                      property: 'clone content',
                      value: (
                        <Code block width="50">
                          {this.toClone}
                        </Code>
                      )
                    }
                  ]
                ]);
                setShowTable(true);
              }

              if (this.formatPrefix == 'node') {
                setShowOverview(false);
              }
            }
          }
        },
        series: {
          lineWidth: 1
        }
      }
    },

    series: [
      {
        ...data,
        boostThreshold: 0, // Boost when there are more than 1
        // point in the series
        type: 'dependencywheel',
        name: '',
        dataLabels: {
          color: '#333',
          style: {
            textOutline: 'none'
          },
          textPath: {
            enabled: true
          },
          distance: 10
        }
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
      <Button
        auto
        scale={2 / 3}
        onClick={() => {
          setShowTable(false);
          setShowOverview(true);
        }}
      >
        Go to overview
      </Button>

      {showOverview && <FileOverview data={overviewTableValues} />}
      {showTable && (
        <>
          <Text h2>Clonepair in Detail</Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap'
            }}
          >
            {tableValues.map((value, idx) => (
              <div
                style={{
                  display: 'flex',
                  flexBasis: '250px',
                  flexWrap: 'wrap',
                  flexDirection: 'column'
                }}
              >
                <Text h3>Clone #{idx + 1}</Text>
                <TableViewChart data={value} key={idx} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
