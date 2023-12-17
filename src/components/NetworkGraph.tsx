import { ChartWrapper } from './ChartWrapper';

export const NetworkGraph = ({ data }) => {
  return (
    <ChartWrapper
      data={[data]}
      chartType="networkgraph"
      customChartOptions={{
        chart: {
          height: (9 / 16) * 80 + '%' // 16:9 ratio
        },
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
            let joined = withoutDups.join('</p><p>');

            return (
              '<b>' +
              this.key +
              '</b>: ' +
              'exchanges clones with <br>' +
              joined
            );
          }
        },

        plotOptions: {
          networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
              enableSimulation: true,
              integration: 'verlet'
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
              allowOverlap: false,
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
