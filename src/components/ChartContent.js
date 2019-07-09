import React, { useState, useRef, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Store } from '../store';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '5px'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    // TextFieldの高さと動的に合わせたい。。。
    minHeight: '32px',
  }
}));

const ChartContent = props => {
  const classes = useStyles();
  const { state, actions } = useContext(Store);
  const isMiddleCenter = props.position === 'middleCenter';
  const [value, setValue] = useState(props.content.value);
  const [isEditng, setEditng] = useState(false);
  const inputElement = useRef(null);
  useEffect(() => {
    if (isEditng) {
      inputElement.current.focus();
    }
  }, [isEditng]);

  const handleSingleClick = () => {
    if (!props.isRandom && !isMiddleCenter) {
      setEditng(true);
    }
  }

  const handleDoubleClick = () => {
    setEditng(false);
    let selectedKey = props.content.key;
    if (!props.isRandom && isMiddleCenter) {
      selectedKey = state.parentKey;
    }

    actions.selectChart(selectedKey);
    props.navigateIndex();
  }

  const handleChange = inputValue => {
    setValue(inputValue);
  }

  const handleBlur = () => {
    actions.changeContent(props.position, value);
    setEditng(false);
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} onClick={handleSingleClick} onDoubleClick={handleDoubleClick}>
        {
          isEditng ? (
            <TextField
              inputRef={inputElement}
              fullWidth
              multiline
              value={value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur} />
          ) : (
              <Typography variant="h6" component="p" className={classes.text}>
                {value}
              </Typography>
            )
        }
      </Paper>
    </div>
  );
}

export default ChartContent;