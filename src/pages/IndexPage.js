import React, { useContext } from 'react';
import Chart from '../components/Chart';
import { Store } from '../store';

const IndexPage = props => {
  const { actions, getters } = useContext(Store);
  const navigateIndex = () => props.history.push('/');
  if (props.location.pathname === '/center') {
    actions.selectCenterOfCharts();
    navigateIndex();
  }

  const chart = getters.getSelectedChart();
  return (
    <Chart chart={chart} isRandom={false} navigateIndex={navigateIndex} />
  );
}

export default IndexPage;