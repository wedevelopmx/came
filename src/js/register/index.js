import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import VisitorNew from './screens/visitor_new';
import VisitorShow from './screens/visitor';
import VisitorList from './screens/visitor_list';

import reducers from './reducers';

class Register extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <HashRouter>
          <div>
            <Switch>
              <Route path="/visitor/new" component={VisitorNew} />
              <Route path="/visitor/:id" component={VisitorShow} />
              <Route path="/" component={VisitorList} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Register />, document.querySelector('.react-container'));
