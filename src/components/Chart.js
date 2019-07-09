import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChartContent from './ChartContent';
import { Store } from '../store';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: '100%',
  }
}));

const Chart = props => {
  const classes = useStyles();
  const { getters } = useContext(Store);

  const chartContents = getters.getPositions()
    .map(position => {
      const content = props.chart[position];
      return <ChartContent
        key={content.key}
        position={position}
        content={content}
        isRandom={props.isRandom}
        navigateIndex={props.navigateIndex}
      />;
    });

  return (
    <div className={classes.gridContainer}>
      {chartContents}
    </div>
  );
}

export default Chart