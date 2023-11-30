import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more'; //module
import { useRef } from 'react';

// Load Highcharts modules

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.
HC_more(Highcharts) //init module

export const ChartWrapper = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const chartOptions = {
    chart: {
        type: 'packedbubble',
        height: '80%'
    },
    title: {
        text: ''
    },
    subTitle: {
        text: 'Coffee consumption'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.y}</sub>'
    },
    plotOptions: {
        packedbubble: {
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            },
            minPointSize: 5
        }
    },
    series: [{
        name: 'Coffee',
        data: [{
            value: 12,
            name: 'Bert'
        }, {
            value: 5,
            name: 'Sam'
        }, {
            value: 10,
            name: 'John'
        }, {
            value: 7,
            name: 'Dick'
        }]
    }, {
        name: 'Energy drinks',
        data: [{
            value: 10,
            name: 'Ma'
        }]
    }, {
        name: 'Tea',
        data: [5, 6, 8, {
            value: 10,
            name: 'Mustapha',
            color: 'pink'
        }]
    }]

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
