import { ChartWrapper } from './ChartWrapper';
import { CircleViewDataStructure } from './ChartWrapper.types';

export const CircleViewChart = (data: CircleViewDataStructure[]) => {
  return (
    <ChartWrapper
      data={data}
      chartType="packedbubble"
      customChartOptions={{
        plotOptions: {
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
  );
};
