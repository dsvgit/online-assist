import { observable, action } from 'mobx';

import customAxios from 'src/framework/customAxios';
import { getUrl } from 'src/framework/url';

const names = ['Алексей', 'Иван', 'Александр',
  'Платон', 'Григорий', 'Михаил',
  'Владимир', 'Анастасия', 'Екатерина',
  'Анна', 'Алена', 'Евгения'];

const api = {
  connect: params => customAxios.post(getUrl(`app/visitor/room1`), { name: names[Math.floor(Math.random() * names.length)] }),
  sendMessage: params => customAxios.post(getUrl(`app/visitor/chat`), params)
};

class Store {
  @observable
  connected = false;

  @observable
  userId = null;

  @observable
  messages = [];

  @observable
  requests = {
    connect: 'pending',
    sendMessage: 'pending'
  };

  @action.bound
  setConnected(payload) {
    this.connected = payload;
  }

  @action.bound
  connect(params) {
    this.requests.connect = 'pending';
    return api.connect(params).then(
      action(response => {
        this.requests.connect = 'done';
        this.userId = response.data.id;
        return response;
      }),
      action(error => {
        this.requests.connect = 'error';
      }),
    );
  }

  @action.bound
  sendMessage(params) {
    this.requests.sendMessage = 'pending';
    return api.sendMessage(params).then(
    action(response => {
      this.requests.sendMessage = 'done';
      return response;
    }),
    action(error => {
      this.requests.sendMessage = 'error';
    }),
    );
  }

  @action.bound
  addMessage(payload) {
    this.messages.push(payload);
  }
}

const store = new Store();

export default store;
