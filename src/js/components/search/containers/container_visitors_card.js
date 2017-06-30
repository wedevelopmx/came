import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchVisitors, selectVisitor } from '../actions';
import moment from 'moment';
import { HourGlass } from 'commons/loaders';

import SearchBar from './container_search_bar';
import Pagination from './searchbar/container_pagination';

class VisitorList extends Component {
  componentDidMount() {
    this.props.fetchVisitors();
  }

  renderVisitors() {
    if(Array.isArray(this.props.visitors))
      return (<HourGlass></HourGlass>);

    if(Object.keys(this.props.visitors).length == 0)
      return (
        <div className="p-a text-center">
          <h6>No existen visitantes registrados.</h6>
        </div>
      );

    const _self = this;
    return _.map(this.props.visitors, visitor => {
      return (
        <li key={visitor.id} className="list-item" onClick={() => _self.props.selectVisitor(visitor) }>
          <a href="#/visitor/" className="list-left">
            <span className="frame fm-sm">
              <img className="picture" src={'/api/visitor/' + visitor.id + '/avatar'} alt="..."/> <i className="on b-white left"></i>
            </span>
          </a>
          <div className="list-body profile">
            <div>
              <span className="name" href="">{visitor.firstName} {visitor.lastName} {visitor.secondSurename}</span>
            </div>
            <small className="location text-muted text-ellipsis">
              <i className="fa fa-map-marker m-r-xs"></i>{visitor.state}, {visitor.country}
              </small>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="box expanse">
        <div className="fit item">
          <SearchBar/>
          <img src="./images/rails_xs.jpg" className="w-full"/>
          <a onClick={ () => this.props.onCreate() } className="md-btn md-raised md-fab md-mini m-r pos-rlt md-fab-offset pull-right blue">
            <i className="material-icons md-24">add</i>
          </a>
        </div>
        <div className="fit text-muted p-a b-b">
          <span className="m-r">{ moment().format('MMMM DD YYYY') }</span>
        </div>
        <div className="fix scrollable">
          <ul className="list inset m-a-0">
            { this.renderVisitors() }
          </ul>
        </div>
        <div className="fit p-r p-l p-b-sm p-t-sm b-t">
          <Pagination/>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    pagination: state.pagination,
    visitors: state.visitors,
    numberOfVisitors: Object.keys(state.visitors).length
  };
}, { fetchVisitors, selectVisitor })(VisitorList);
