import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

function TopBar(props) {
    const { classes } = props;  
    return (
        <div>
            <AppBar  position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Welcome to <Link to="/">{{cookiecutter.project_name}}</Link> <span role="img" aria-label="sunglasses">😎</span>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default withStyles(styles)(TopBar);
