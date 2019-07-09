import React, { useContext } from 'react';
import Chart from '../components/Chart';
import { Store } from '../store';

const RandomPage = props => {
  const { getters } = useContext(Store);
  const chart = getters.generateRandomChart();
  const navigateIndex = () => props.history.push('/');
  return (
    <Chart chart={chart} isRandom={true} navigateIndex={navigateIndex} />
  );
}

export default RandomPage;