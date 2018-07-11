import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import RandomNumberCard from './randomNumberCard';
import { nonce } from '../actions';

const styles = theme => ({
  root: {
    flex: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

function CollectionView(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Cookiecutter-Django: React Edition
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(16)}
          >
            <RandomNumberCard />
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.createCollection('yo')}
      >
        Hello World
      </Button>
    </div>
  );
}

const mapStateToProps = state => ({
  nonce: state.nonce 
});

const mapDispatchToProps = dispatch => ({
  setNonce: text => {
    dispatch(nonce.setNonce(text));
  }
});

CollectionView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CollectionView));
