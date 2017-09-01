import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchVisitors, selectVisitor } from 'search/actions';
import moment from 'moment';
import { HourGlass } from 'commons/loaders';

import { DepartureState, Pagination } from 'search';

class VisitorList extends Component {
  componentDidMount() {
    this.props.fetchVisitors();
    moment.locale('es');
  }

  renderVisitors() {
    if(Array.isArray(this.props.visitors))
      return (<tr><td><HourGlass></HourGlass></td></tr>);

    if(Object.keys(this.props.visitors).length == 0)
      return (
        <tr>
          <td>
            <div className="p-a text-center">
              <h6>No existen visitantes registrados.</h6>
            </div>
          </td>
        </tr>
      );

    const _self = this;
    return _.map(this.props.visitors, visitor => {
      const location = `${visitor.state}, ${visitor.country}`;
      return (
        <tr key={visitor.id}>
          <td className="align-middle"><DepartureState departure={visitor.departure}/></td>
          <td>
            <a href="#/visitor/" className="list-left">
              <span className="frame fm-sm">
                <img className="picture" src={'/api/visitor/' + visitor.avatar + '/avatar'} alt="..."/> <i className="on b-white left"></i>
              </span>
            </a>
          </td>
          <td>
            <span className="block m-b-xs" href="">
              {`${visitor.firstName} ${visitor.lastName} ${visitor.secondSurename || ''}`}
            </span>
            <small className="block text-muted text-ellipsis">
              <i className="material-icons m-r-xs">room</i> { `${location.substring(0,20)}...` }
            </small>
          </td>
          <td className="text-center">{ moment(new Date(visitor.birthdate)).fromNow(true) }</td>
          <td className="text-center">{ visitor.gender ? visitor.gender.substring(0,1).toUpperCase() : '' }</td>
          <td className="text-center">{ visitor.status ? visitor.status.substring(0,1).toUpperCase() : '' }</td>
          <td>{ visitor.departure.state }</td>
          <td>{ moment(new Date(visitor.departure.startDate)).format("DD/MM/YYYY") }</td>
          <td>{ moment(new Date(visitor.departure.scheduleEndDate)).format("DD/MM/YYYY") }</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="col-full">
        <div className="wrapper">
          <div className="box expanse">
            <div className="fit p-r p-l p-b-sm p-t-sm b-t">

            </div>
            <div className="fix scrollable">
              <table className="table table-striped b-t">
                <thead className="composed-header">
                  <tr>
                    <th></th>
                    <th colSpan="2">Visitante</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Entrada</th>
                    <th>Programada</th>
                  </tr>
                </thead>
                <tbody>
                  { this.renderVisitors() }
                </tbody>
              </table>
            </div>
            <div className="fit p-r p-l p-b-sm p-t-sm b-t">
              <Pagination/>
            </div>
          </div>
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
