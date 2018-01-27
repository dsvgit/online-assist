import _ from 'lodash';
import { observable, computed, action } from 'mobx';

import customAxios from 'src/framework/customAxios';
import { getUrl } from 'src/framework/url';

class Store {
  @observable
  currentUserId = null;

  @observable
  users = [];

  @computed get currentUser() {
    return _.find(this.users, user => user.id === this.currentUserId);
  }

  @action.bound
  addUser(payload) {
    this.users.push(payload);
  }

  @action.bound
  changeCurrentUser(payload) {
    this.currentUserId = payload;
  }
}

const store = new Store();

export default store;
