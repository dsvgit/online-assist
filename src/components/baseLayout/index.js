import React from 'react';
import classnames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import styles from './index.scss';

export default props => {
  const { children, align, title } = props;

  const layoutClassName = classnames(styles.layout, styles[align]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={layoutClassName}>
        {children}
      </div>
    </div>
  );
}
