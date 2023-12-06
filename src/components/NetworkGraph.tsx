import { ChartWrapper } from './ChartWrapper';

export const NetworkGraph = ({ data }) => {
  console.log('graph data', data);
  return (
    <ChartWrapper
      data={[data]}
      chartType="networkgraph"
      customChartOptions={{
        plotOptions: {
          networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
              enableSimulation: true,
              integration: 'verlet',
              linkLength: 100
            }
          }
        },

        series: [
          {
            marker: {
              radius: 13
            },
            dataLabels: {
              enabled: true,
              linkFormat: '',
              allowOverlap: true,
              style: {
                textOutline: false
              }
            },
            data: [...data]
            // nodes: [
            //   {
            //     id: 'Seoul ICN',
            //     marker: {
            //       radius: 30
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Daegu',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Busan',
            //     marker: {
            //       radius: 30
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Seoul GMP',
            //     marker: {
            //       radius: 20
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Jeju',
            //     marker: {
            //       radius: 30
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Gwangju',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Yeosu',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Sacheon',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Ulsan',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Pohang',
            //     marker: {
            //       radius: 20
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Gunsan',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Wonju',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Yangyang',
            //     marker: {
            //       radius: 10
            //     },
            //     color: 'black'
            //   },
            //   {
            //     id: 'Cheongju',
            //     marker: {
            //       radius: 20
            //     },
            //     color: 'black'
            //   }
            // ]
          }
        ]
      }}
    />
  );
};
