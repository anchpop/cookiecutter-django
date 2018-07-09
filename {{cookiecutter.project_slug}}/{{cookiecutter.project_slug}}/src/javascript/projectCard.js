import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    maxWidth: 275,
    minHeight: 230,
    maxHeight: 230
  },
  cardContent: {
    flex: 1
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardActions: {
    flex: 1
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color="textSecondary">
            @{props.owner}'s project
          </Typography>
          <Typography
            className={classes.name}
            variant="headline"
            component="h2"
          >
            {props.collectionName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.numOfImages} collections
          </Typography>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
