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

import { getUrl } from 'src/framework/url';
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

  render() {
    const {
      chatStore: {
        users
      },
      classes
    } = this.props;

    return (
      <BaseLayout align="left" title="Чат">
        <div className={classes.usersList}>
          <List>
            {_.map(users, user => (
            <ListItem button>
              <ListItemText primary={user.id} secondary="online" />
            </ListItem>
            ))}
          </List>
        </div>
      </BaseLayout>
    );
  }
}

export default ChatPage;
