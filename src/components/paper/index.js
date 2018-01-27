import React from 'react';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';

const CommonPaper = props => {
  const { classes, className } = props;

  return (
    <Paper className={classes.paper} {...props} />
  );
}

const styles = {
  paper: {
    padding: 15
  }
};

export default withStyles(styles)(CommonPaper);
