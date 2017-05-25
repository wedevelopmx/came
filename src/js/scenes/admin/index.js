import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import AdminScreen from './screen/admin_screen';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Register extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter>
          <div className="screen">
            <Switch>
              <Route path="/" component={AdminScreen} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.workspace'));
