import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CollectionCard from './collectionCard';
import ProjectCard from './projectCard';
import { collections } from './actions';

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

const ProjectsAndCollections = props => {
  const cards = [];
  const { classes } = props;
  if (props.collections !== undefined) {
    for (let i = 0; i < props.collections.length; i += 1) {
      const collec = props.collections[i];
      cards.push(
        <CollectionCard
          key={collec.id}
          owner={collec.owner}
          collectionName={collec.name}
          numOfImages={collec.numImages}
          description={collec.description}
        />
      );
    }
  }

  if (props.projects !== undefined) {
    for (let i = 0; i < props.projects.length; i += 1) {
      const project = props.projects[i];
      cards.push(
        <ProjectCard
          key={project.id}
          owner={project.owner}
          collectionName={project.name}
          numOfImages={project.numImages}
          description={project.description}
        />
      );
    }
  }

  return (
    <div>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Labelsquadz
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
            {cards.map((value, index) => (
              <Grid key={index} item>
                {value}
              </Grid>
            ))}
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
      <Link to="/collection">collection</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  collections: state.collections,
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  createCollection: text => {
    dispatch(collections.createCollection(text));
  }
});

ProjectsAndCollections.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProjectsAndCollections));
