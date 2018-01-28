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

const names = ['Алексей', 'Иван', 'Александр',
  'Платон', 'Григорий', 'Михаил',
  'Владимир', 'Анастасия', 'Екатерина',
  'Анна', 'Алена', 'Евгения'];

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

    this.id = makeId();
  }

  componentDidMount() {
    const socket = new SockJS(getUrl('/ws-visitors'));

    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      stompClient.send('/app/visitor.add', {}, JSON.stringify({
        id: makeId(),
        name: names[Math.floor(Math.random() * names.length)]
      }));
    });
  }

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.message}>
        Оставьте свое сообщение в этой форме, и мы получим его на e-mail и обязательно ответим!
      </div>
    );
  }
}

export default ChatPage;
