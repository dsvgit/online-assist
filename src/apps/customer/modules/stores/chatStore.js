import _ from 'lodash';
import { observable, computed, action } from 'mobx';

import customAxios from 'src/framework/customAxios';
import { getUrl } from 'src/framework/url';

const api = {
  fetchVisitors: params => customAxios.get(getUrl(`app/customer/visitors`)),
  sendMessage: params => customAxios.post(getUrl(`app/customer/chat`), params)
};

class Store {
  @observable
  currentVisitorId = null;

  @observable
  visitors = [];

  @observable
  messages = [];

  @observable
  requests = {
    fetchVisitors: 'pending',
    sendMessage: 'pending'
  };

  @computed get currentVisitor() {
    const visitor = _.find(this.visitors, visitor => visitor.id === this.currentVisitorId);
    return visitor;
  }

  @computed get currentMessages() {
    const messages = _.chain(this.messages)
      .filter(message => message.visitorID == this.currentVisitorId)
      .map(m => m.message)
      .value();
    return messages;
  }

  @action.bound
  fetchVisitors(params) {
    this.requests.fetchVisitors = 'pending';
    return api.fetchVisitors(params).then(
      action(response => {
        this.requests.fetchVisitors = 'done';
        this.visitors = response.data;
        return response;
      }),
      action(error => {
        this.requests.fetchVisitors = 'error';
      })
    );
  }

  @action.bound
  addVisitor(payload) {
    this.visitors.push(payload);
  }

  @action.bound
  changeCurrentVisitor(payload) {
    this.currentVisitorId = payload;
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
