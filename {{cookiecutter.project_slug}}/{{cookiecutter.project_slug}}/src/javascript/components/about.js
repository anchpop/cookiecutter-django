import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TopBar from "./topBar"

const styles = theme => ({
  root: {
    flex: 1
  },
  code: {
    display: 'inline',
    fontWeight: 'bold'
  },
  cardRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 20,
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
      <TopBar />

      
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(16)}
          >
          <Paper className={classes.cardRoot} elevation={1}>
            <Typography variant="headline" component="h3">
              Philosophy
            </Typography>
            <Typography component="p">
              I made this because I wanted to use React with Django and couldn't find a mature, production-ready way online that included the features I wanted.
            </Typography>
            <Typography component="p">
              I wanted a UI toolkit built in, server side rendering, and routing, and I couldn't find a suitable way online. I also included optimized, code split, PWA-enabled builds. 
              In addition I threw in some things almost all react apps will use, such as Redux and Reselect, and some tools I just like, like Storybook and crypto-js.
            </Typography>
          </Paper>
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
}

CollectionView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CollectionView);
