import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import DashboardView from './screens/dashboard';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Dashboard extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <DashboardView/>
      </Provider>
    );
  }
}

ReactDOM.render(<Dashboard />, document.querySelector('.workspace'));
