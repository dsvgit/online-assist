import _ from 'lodash';
import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { observer, inject } from 'mobx-react';
import io from 'socket.io-client';
import List, {
  ListItem,
  ListItemText
} from 'material-ui/List';

import { getWsUrl } from 'src/framework/url';
import BaseLayout from 'src/components/baseLayout';

const styles = theme => ({
  usersList: {
    width: '100%',
    maxWidth: 360,
    minHeight: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

@withStyles(styles)
@inject('chatStore')
@observer
class ChatPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      chatStore
    } = this.props;

    const socket = new WebSocket(getWsUrl('customers'));

    let a = 0;
    setInterval(() => chatStore.addUser({ id: a++ }), 1000);
  }

  renderUsersList = () => {
    const {
      chatStore: {
        users
      }
    } = this.props;

    if (!users || !users.length) {
      return (
        <ListItem>
          <ListItemText primary="Нет активных пользователей" />
        </ListItem>
      );
    }

    return _.map(users, user => (
      <ListItem key={user.id} button>
        <ListItemText primary={user.id} secondary="online" />
      </ListItem>
    ));
  };

  render() {
    const {
      classes
    } = this.props;

    return (
      <BaseLayout align="left" title="Чат">
        <div className={classes.usersList}>
          <List>
            {this.renderUsersList()}
          </List>
        </div>
      </BaseLayout>
    );
  }
}

export default ChatPage;
