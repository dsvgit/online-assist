import _ from 'lodash';
import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { observer, inject } from 'mobx-react';
import io from 'socket.io-client';

import { getUrl } from 'src/framework/url';
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
