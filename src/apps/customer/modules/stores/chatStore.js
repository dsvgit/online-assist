import { observable, action } from 'mobx';

import customAxios from 'src/framework/customAxios';
import { getUrl } from 'src/framework/url';

class Store {
  @observable
  users = [
    {
      id: 'user 1'
    }
  ];
}

const store = new Store();

export default store;
