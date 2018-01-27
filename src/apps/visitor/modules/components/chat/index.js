import _ from 'lodash';
import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { observer, inject } from 'mobx-react';
import io from 'socket.io-client';

import customAxios from 'src/framework/customAxios';
import { getUrl, getWsUrl } from 'src/framework/url';
import makeId from 'src/framework/makeId';
import BaseLayout from 'src/components/baseLayout/index';

const names = ['Алексей', 'Иван', 'Александр', 'Платон'];

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
    // const socket = new WebSocket(getWsUrl('app/customer/visitors'));
    this.connect();
    window.addEventListener('beforeunload', this.disconnect);
  }

  componentWillUnmount() {
    this.disconnect();
    window.removeEventListener('beforeunload', this.disconnect);
  }

  connect = () => {
    customAxios.post(getUrl('api/visitor'), {
      id: this.id,
      name: names[Math.floor(Math.random() * names.length)]
    });
  };

  disconnect = () => {
    customAxios.delete(getUrl(`api/visitor/${this.id}`));
  };

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
