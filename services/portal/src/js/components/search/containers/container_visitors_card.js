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

// <DepartureState departure={visitor.departure}/>
const DepartureState = function(props) {
  const { state, scheduleEndDate, endDate } = props.departure;
  let statusColor = "pull-right ";

  // If visitor has not exit and should go out within next 24 hours
  if(!endDate && Date.parse(scheduleEndDate) > Date.now() && Date.parse(scheduleEndDate) - Date.now() < 86400000) {
    statusColor += " text-warn";
  } else {
    switch (state) {
      case "expulsado":
        statusColor += "text-danger";
        break;
      case "hospedado":
        statusColor += "text-success";
        break;
      default: // baja definitiva | por tren
        statusColor += "text-blue";
    }
  }

  return (
    <span className={`${statusColor}`}><i className="material-icons m-r-xs">brightness_1 </i></span>
  );
}

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
              <img className="picture" src={'/api/visitor/' + visitor.avatar + '/avatar'} alt="..."/> <i className="on b-white left"></i>
            </span>
          </a>
          <div className="list-body profile">
            <span className="block m-b-xs" href="">
              {`${visitor.firstName} ${visitor.lastName} ${visitor.secondSurename || ''}`} &nbsp;
              <DepartureState departure={visitor.departure}/>
            </span>
            <small className="block text-muted text-ellipsis">
              <i className="material-icons m-r-xs">airline_seat_individual_suite</i> { moment(new Date(visitor.departure.startDate)).fromNow(true) } &nbsp;
                | <i className="material-icons m-r-xs">room</i> { `${visitor.state}, ${visitor.country}` }
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
          <span className="m-r">{ moment().format('MMMM DD, YYYY') }</span>
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
