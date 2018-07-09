import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {}
};

const Loading = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
};

export default withStyles(style)(Loading);
