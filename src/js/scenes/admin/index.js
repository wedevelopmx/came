import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import AdminScreen from './screen/admin_screen';

import reducers from './reducers';

import {CategoryCard} from 'category';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Register extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Provider store={createStoreWithMiddleware(reducers)}>
              <CategoryCard/>
            </Provider>
          </div>
        </div>
      </div>
    );
  }
}

// <HashRouter>
//   <div className="screen">
//     <Switch>
//       <Route path="/" component={AdminScreen} />
//     </Switch>
//   </div>
// </HashRouter>

ReactDOM.render(<Register />, document.querySelector('.workspace'));
