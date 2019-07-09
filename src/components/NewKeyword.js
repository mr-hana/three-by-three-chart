import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Store } from '../store';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '80%'
  }
}));

const NewKeyword = props => {
  const classes = useStyles();
  const { actions } = useContext(Store);
  const [value, setValue] = useState('');
  const handleChange = inputValue => {
    setValue(inputValue);
  }

  const handleClick = () => {
    actions.initChart(value);
    props.navigateNext();
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title="Input new keyword" subheader="Click the new button to delete the current chart and create a new chart." />
        <CardContent>
          <Box mb={2}>
            <TextField
              label="keyword"
              fullWidth
              value={value}
              onChange={e => handleChange(e.target.value)} />
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth color="primary" onClick={handleClick}>New</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default NewKeyword