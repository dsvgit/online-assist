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
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { getUrl, getWsUrl } from 'src/framework/url';
import BaseLayout from 'src/components/baseLayout';
import makeId from 'src/framework/makeId';

const names = ['Алексей', 'Иван', 'Александр', 'Платон'];

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
  }

  componentDidMount() {
    const {
      chatStore
    } = this.props;


    const socket = new SockJS(getUrl('/ws-visitors'));

    const stompClient = Stomp.over(socket);

    stompClient.connect({}, frame => {
      stompClient.subscribe('/customer/visitors', visitor => {
        chatStore.addUser(JSON.parse(visitor.body));
      });
    });
  }

  renderHeader = () => {
    const {
      chatStore: {
        currentUser
      },
      classes
    } = this.props;

    return (
      <header className={classes.chatHeader}>
        {currentUser.name}
      </header>
    );
  };

  renderUsersList = () => {
    const {
      chatStore,
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
      <ListItem key={user.id} onClick={() => chatStore.changeCurrentUser(user.id)} button>
        <ListItemText primary={user.name} secondary={`Активен: ${user.sSingInDate}`} />
      </ListItem>
    ));
  };

  render() {
    const {
      classes,
      chatStore: {
        currentUser
      }
    } = this.props;

    return (
      <BaseLayout align="left" title="Чат">
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <List>
              {this.renderUsersList()}
            </List>
          </div>
          { !currentUser ? 'Выберите пользователя' : (
            <div className={classes.chat}>
              {this.renderHeader()}
              <main className={classes.chatBody}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facilis repudiandae? A assumenda et ex fugiat incidunt neque placeat quasi veritatis vero voluptatem. Aspernatur beatae consequatur dicta dignissimos dolor eius eos ex expedita itaque labore libero maiores minus modi nulla placeat quam quidem reprehenderit saepe, sint sit, tenetur ut, vel voluptatem. Aliquid amet architecto aut beatae commodi cumque dicta doloremque eaque est excepturi illum inventore magni maiores mollitia natus nemo placeat quae quasi qui, quisquam similique totam veniam? Culpa cumque cupiditate doloremque eius eligendi ex explicabo facilis illo ipsam ipsum modi necessitatibus optio pariatur porro quam qui sapiente sequi, sit voluptate voluptatibus? Aliquid at debitis dolore excepturi fugit quod similique sint. Corporis dolores ea est facilis labore veniam? Aliquid amet aperiam atque aut consequuntur deleniti distinctio dolores doloribus eaque earum eligendi, est et eum eveniet fugiat labore, laudantium minima nam obcaecati officiis perspiciatis placeat quae quam, quia quibusdam quis quos ratione rerum sapiente sequi sint totam ut vero? Cumque eum obcaecati saepe? Consequatur delectus, dignissimos fugiat iure non odit repudiandae sit! At cumque delectus, deleniti dolor ipsum, nobis nulla obcaecati omnis perferendis quisquam repellat, tempora. Architecto, atque deserunt dignissimos excepturi explicabo fugit inventore itaque magnam molestiae odio omnis quae quam quia recusandae sint sit tempora unde? Debitis deleniti inventore neque, perspiciatis quae similique temporibus velit vitae. Aut culpa cupiditate dicta error harum laborum perferendis quibusdam, quod recusandae repellat rerum tempore temporibus ut voluptatem voluptates. Aliquam, atque culpa cum dolores fugiat inventore mollitia omnis ratione sint temporibus tenetur ullam veniam! Accusantium aliquam autem delectus ducimus facere illo in ipsum laboriosam libero, nam nesciunt nihil nisi nobis obcaecati officia officiis quia ratione, sed ullam, voluptatibus. Asperiores aspernatur commodi corporis dolores earum impedit incidunt iusto laborum laudantium modi numquam officiis praesentium provident, quo quos reprehenderit repudiandae similique tenetur velit veniam? Ad adipisci aliquid animi aperiam at autem beatae commodi corporis cum cumque, delectus dolor dolores dolorum est facilis fugiat fugit iusto labore nihil nostrum numquam, obcaecati optio pariatur praesentium quae quam quia quibusdam quos rem rerum sunt temporibus ullam unde veniam veritatis voluptatem voluptatibus! Asperiores blanditiis commodi odit quas quasi? Architecto, qui sit. Ad aperiam blanditiis cum doloribus fugit laborum officia quae, quidem quo totam. Aliquid, aspernatur corporis cum cumque eveniet ex facilis in ipsum iste labore neque nihil odio odit omnis rerum sapiente sequi suscipit. Accusamus, consequatur consequuntur corporis cupiditate delectus dolore dolorem dolores ea exercitationem facere facilis harum hic iure molestiae necessitatibus nemo omnis perspiciatis placeat quaerat quam quidem quod reiciendis rem repudiandae suscipit ullam ut velit voluptas voluptate voluptates. Illo ipsa pariatur perferendis reprehenderit vel. Consequuntur ea, error exercitationem iure labore magni neque soluta vel. Cum delectus, doloremque, dolores expedita id labore maiores nam, quaerat quod sapiente suscipit tenetur ut! Ab ad animi dolor dolores fuga incidunt ipsa minus modi molestias nam, nesciunt nisi nostrum omnis quam, quia quibusdam quod repellat reprehenderit tempore unde ut velit veniam veritatis! A adipisci aliquid aperiam, aspernatur atque cum debitis deserunt et eveniet ex facere id incidunt minus obcaecati placeat provident quidem rem, rerum saepe suscipit tempore tenetur unde veniam, veritatis voluptatum. Aliquam dolorum eum fuga molestiae mollitia nulla obcaecati placeat recusandae rem tenetur, velit veritatis, voluptates. Aliquam, aliquid asperiores cumque cupiditate, debitis earum eius eos exercitationem illo minus non omnis, placeat provident qui sit ullam veritatis voluptates voluptatum! Debitis distinctio dolor ea eos et libero nobis odio placeat quam, suscipit! Ad at cumque dolorum eligendi fugit illo inventore ipsam, labore laboriosam nesciunt non odio perferendis, placeat qui reiciendis repellat sint suscipit unde vel vero! Ab aliquam distinctio et, excepturi exercitationem id incidunt itaque iure magnam minus modi molestiae mollitia, necessitatibus nisi perspiciatis quis quisquam quo quod reiciendis repudiandae tenetur vitae voluptatum. Magni maiores maxime minima natus ratione reprehenderit. Accusamus consequuntur, corporis cumque doloremque dolorum facilis modi mollitia neque nesciunt nulla obcaecati officiis reiciendis rem repellat sit soluta tenetur! Dicta iure quo suscipit. Aperiam assumenda atque autem commodi ea enim et incidunt ipsum iste maiores, odio provident quia quisquam rerum tempore ut vero voluptatem voluptatibus. Aliquam amet architecto, dolore doloremque iure laborum minima neque nesciunt quia veniam. Ab esse labore odio placeat voluptatibus? Expedita iusto nulla numquam ullam ut. Ab accusamus amet cumque deleniti dicta, dolor eaque eligendi, et ex harum ipsam iste labore laudantium mollitia nesciunt nihil nobis numquam odio officia perferendis praesentium quae quaerat reprehenderit sequi sunt tempore veritatis vero. Accusamus accusantium, atque commodi, culpa doloribus ex in minima minus nulla numquam qui, saepe sint voluptatum. A excepturi itaque labore maiores mollitia porro provident quae quos sunt voluptatibus! Accusantium in libero, necessitatibus obcaecati officia placeat quam quis repudiandae soluta vero? Commodi fugiat ipsa laboriosam minus molestias quod, sit vitae voluptatibus? A ab adipisci aliquam aliquid asperiores atque beatae consequatur culpa cupiditate ducimus enim eum explicabo laborum maxime modi nesciunt nisi obcaecati odio, odit optio perspiciatis placeat porro possimus praesentium provident quam quidem ratione reprehenderit repudiandae sed tempore totam unde velit veniam veritatis vero voluptatibus. Aliquam aspernatur assumenda atque dolorum eius est et eveniet expedita harum libero, nemo officia quasi quo repudiandae sint, suscipit tenetur, ullam voluptas voluptate voluptatibus! Cumque debitis dolorum eligendi esse facere minus molestiae, nisi nulla numquam odio odit perferendis, quas, quia quibusdam rem repudiandae sunt suscipit totam veritatis voluptas! Cupiditate eaque eveniet, excepturi expedita hic id iste libero nesciunt, perferendis provident quia quis tenetur, veritatis. Aliquam aut doloremque labore maxime odit perspiciatis, quisquam tempora ut. Accusantium ad at beatae, fugit harum ipsam minima molestiae nobis obcaecati placeat quidem quisquam quos reiciendis sed sit sunt ut vitae. Asperiores dolore dolores eaque enim illo ipsa laboriosam necessitatibus odit quam quas repellat vitae, voluptate voluptates! Animi blanditiis debitis exercitationem facere fuga inventore iste laboriosam, maiores sit velit? Consequatur, cum cumque ducimus facilis magnam, molestiae nam nihil officiis quia quibusdam sequi sit veritatis voluptate! Accusamus, atque commodi culpa dolores enim id illum iusto mollitia nesciunt obcaecati odit pariatur quasi reprehenderit velit vitae? Accusamus accusantium aliquid at beatae distinctio dolor doloribus earum eligendi eos expedita explicabo fugiat in labore necessitatibus neque nisi non nulla pariatur provident, quae quia quod repellendus saepe sequi tempora voluptatibus!</main>
              <footer className={classes.chatFooter}>footer</footer>
            </div>
          )}
        </div>
      </BaseLayout>
    );
  }
}

export default ChatPage;
