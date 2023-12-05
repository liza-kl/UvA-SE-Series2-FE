import { ChartWrapper } from './ChartWrapper';

/**
 * Problem with the Packed circle you can't go deeper than only one level which
 * is a bit of a shame.
 */
export const Treemap = () => {
  return (
    <ChartWrapper
      type="treemap"
      data={[
        {
          id: 'A',
          name: 'Nord-Norge',
          color: '#50FFB1'
        },
        {
          id: 'B',
          name: 'Trøndelag',
          color: '#F5FBEF'
        },
        {
          id: 'C',
          name: 'Vestlandet',
          color: '#A09FA8'
        },
        {
          id: 'D',
          name: 'Østlandet',
          color: '#E7ECEF'
        },
        {
          id: 'E',
          name: 'Sørlandet',
          color: '#A9B4C2'
        },
        {
          name: 'Troms og Finnmark',
          parent: 'A',
          value: 70923
        },
        {
          name: 'Nordland',
          parent: 'A',
          value: 35759
        },
        {
          name: 'Trøndelag',
          parent: 'B',
          value: 39494
        },
        {
          name: 'Møre og Romsdal',
          parent: 'C',
          value: 13840
        },
        {
          name: 'Vestland',
          parent: 'C',
          value: 31969
        },
        {
          name: 'Rogaland',
          parent: 'C',
          value: 8576
        },
        {
          name: 'Viken',
          parent: 'D',
          value: 22768
        },
        {
          name: 'Innlandet',
          parent: 'D',
          value: 49391
        },
        {
          name: 'Oslo',
          parent: 'D',
          value: 454
        },
        {
          name: 'Vestfold og Telemark',
          parent: 'D',
          value: 15925
        },
        {
          name: 'Agder',
          parent: 'E',
          value: 14981
        }
      ]}
    />
  );
};