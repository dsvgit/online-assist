import _ from 'lodash';
import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { observer, inject } from 'mobx-react';
import List, {
  ListItem,
  ListItemText
} from 'material-ui/List';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { getUrl } from 'src/framework/url';
import BaseLayout from 'src/components/baseLayout';

const styles = theme => ({
  container: {
    width: '100%',
    height: 'calc(100vh - 74px)',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  sidebar: {
    width: '100%',
    maxWidth: 360,
    minHeight: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRight: '2px solid #ccc',
    overflow: 'auto'
  },
  chat: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  },
  chatHeader: {
    height: 40,
    backgroundColor: '#ccc'
  },
  chatBody: {
    height: 'calc(100vh - 154px)',
    overflow: 'auto'
  },
  chatFooter: {
    height: 40,
    backgroundColor: '#ccc'
  }
});

@withStyles(styles)
@inject('chatStore')
@observer
class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.socket = null;
    this.stompClient = null;
  }

  componentDidMount() {
    const {
      chatStore
    } = this.props;

    chatStore.fetchVisitors();

    this.socket = new SockJS(getUrl('ws-customers'));
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/customer/visitors/room1', visitor => {
        chatStore.addVisitor(JSON.parse(visitor.body));
      });

      this.stompClient.subscribe('/chat/room1', message => {
        chatStore.addMessage(JSON.parse(message.body));
      });
    });
  }

  renderHeader = () => {
    const {
      chatStore: {
        currentVisitor
      },
      classes
    } = this.props;

    return (
      <header className={classes.chatHeader}>
        {currentVisitor.name}
      </header>
    );
  };

  renderVisitorsList = () => {
    const {
      chatStore,
      chatStore: {
        visitors
      }
    } = this.props;

    if (!visitors || !visitors.length) {
      return (
        <ListItem>
          <ListItemText primary="Нет активных пользователей" />
        </ListItem>
      );
    }

    return _.map(visitors.slice().reverse(), visitor => (
      <ListItem key={visitor.id} onClick={() => chatStore.changeCurrentVisitor(visitor.id)} button>
        <ListItemText primary={visitor.name} secondary={`Активен: ${visitor.sSingInDate}`} />
      </ListItem>
    ));
  };

  sendMessage = () => {
    const {
      chatStore,
      chatStore: {
        currentVisitorId
      }
    } = this.props;

    chatStore.sendMessage({
      visitorID: currentVisitorId,
      roomID: 'room1',
      message: 'Новое сообщение'
    });
  };

  render() {
    const {
      classes,
      chatStore: {
        currentVisitor,
        currentMessages
      }
    } = this.props;

    return (
      <BaseLayout align="left" title="Чат">
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <List>
              {this.renderVisitorsList()}
            </List>
          </div>
          { !currentVisitor ? 'Выберите пользователя' : (
            <div className={classes.chat}>
              {this.renderHeader()}
              <main className={classes.chatBody}>
                {_.map(currentMessages, message => (
                  <div>{message}</div>
                ))}
              </main>
              <footer className={classes.chatFooter}>
                <button onClick={this.sendMessage}>Отправить сообщение</button>
              </footer>
            </div>
          )}
        </div>
      </BaseLayout>
    );
  }
}

export default ChatPage;
