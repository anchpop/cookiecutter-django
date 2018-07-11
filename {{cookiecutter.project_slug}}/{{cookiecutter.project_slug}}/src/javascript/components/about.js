import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
    </div>
  );
}

CollectionView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CollectionView);
