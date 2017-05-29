import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import VisitorNew from './screens/visitor_new';
import VisitorShow from './screens/visitor';
import VisitorList from './screens/visitor_list';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Register extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <VisitorList/>
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.workspace'));
