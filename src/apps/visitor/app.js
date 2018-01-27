import React from 'react';
import { Router, Redirect } from 'react-router-dom';
import AppRouter from './AppRouter';
import { Provider } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import ErrorBoundary from 'src/components/ErrorBoundary/index';
import history from 'src/apps/visitor/history';
import chatStore from 'src/apps/visitor/modules/stores/chatStore';

import theme from '../../styles/theme';
import '../../styles/common.scss';
import '../../styles/normalize.scss';

const stores = {
  chatStore
};

const muiTheme = createMuiTheme(theme);

export default props => {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <MuiThemeProvider theme={muiTheme}>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
};
