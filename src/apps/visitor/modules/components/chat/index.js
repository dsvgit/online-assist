import _ from 'lodash';
import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { observer, inject } from 'mobx-react';
import io from 'socket.io-client';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import customAxios from 'src/framework/customAxios';
import { getUrl, getWsUrl } from 'src/framework/url';
import makeId from 'src/framework/makeId';
import BaseLayout from 'src/components/baseLayout/index';

const styles = {
  message: {
    margin: '0 auto',
    padding: '10px',
    paddingTop: 100,
    textAlign: 'center'
  }
};

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
    const { chatStore } = this.props;

    this.socket = new SockJS(getUrl('ws-customers'));
    this.stompClient = Stomp.over(this.socket);

    chatStore.connect()
    .then(response => {
      const userId = response.data.id;

      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe(`/chat/room1/${userId}`, message => {
          console.log(message);
          chatStore.addMessage(JSON.parse(message.body));
        });

        chatStore.setConnected(true);
      });
    });
  }

  sendMessage = () => {
    const {
      chatStore,
      chatStore: {
        userId
      }
    } = this.props;

    chatStore.sendMessage({
      visitorID: userId,
      roomID: 'room1',
      message: 'Новое сообщение'
    });
  };

  render() {
    const {
      chatStore: {
        userId,
        connected,
        messages
      },
      classes
    } = this.props;

    return (
      <div className={classes.message}>
        Оставьте свое сообщение в этой форме, и мы получим его на e-mail и обязательно ответим!
        <div>{userId}</div>
        {_.map(messages, (message, i) => (
          <div key={i}>{message.message}</div>
        ))}
        <button disabled={!connected} onClick={this.sendMessage}>Отправить сообщение</button>
      </div>
    );
  }
}

export default ChatPage;
