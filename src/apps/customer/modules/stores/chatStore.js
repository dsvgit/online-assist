import { observable, action } from 'mobx';

import customAxios from 'src/framework/customAxios';
import { getUrl } from 'src/framework/url';

class Store {
  @observable
  users = [];

  @action.bound
  addUser(payload) {
    this.users.push(payload);
  }
}

const store = new Store();

export default store;
