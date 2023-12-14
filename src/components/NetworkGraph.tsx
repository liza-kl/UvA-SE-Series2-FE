import { ChartWrapper } from './ChartWrapper';

export const NetworkGraph = ({ data }) => {
  return (
    <ChartWrapper
      data={[data]}
      chartType="networkgraph"
      customChartOptions={{
        tooltip: {
          formatter: function () {
            let connections = [];

            data.map((elem) => {
              elem.includes(this.key) && connections.push(elem);
            });

            let flatConnections = connections.flat();
            let withoutDups = flatConnections.filter(
              (item, index) =>
                flatConnections.indexOf(item) === index && item !== this.key
            );
            let joined = withoutDups.join(',');

            return (
              '<b>' + this.key + '</b>: ' + 'exchanges clones with ' + joined
            );
          }
        },

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
              radius: 20
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
          }
        ]
      }}
    />
  );
};
