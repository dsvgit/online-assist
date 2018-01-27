import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Chat from './modules/components/chat';

export default props => {
  return (
    <Switch>
      <Route path="/" component={Chat} />
    </Switch>
  );
};
