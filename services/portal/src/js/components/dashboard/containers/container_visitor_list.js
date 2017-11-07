import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchVisitors } from '../actions';

class VisitorList extends Component {
  componentWillMount() {
    // this.props.fetchVisitors({ scheduleEndDate: moment().format("YYYY-MM-DD") });
    this.props.fetchVisitors({ scheduleEndDate: "2017-09-06", departure: 'hospedado' });
  }

  render() {
    if(!this.props.visitors)
      return;

    const visitors = this.props.visitors.map((visitor) => {
      return (
        <tr key={visitor.id}>
          <td>{ `${visitor.firstName} ${visitor.lastName}` }</td>
          <td>{ visitor.departure.state }</td>
          <td>{ moment(new Date(visitor.departure.startDate)).format("DD/MM/YYYY") }</td>
        </tr>
      );
    });

    return (
      <div className="box m-t-sm">
        <div className="box-header dker">
          <h3>Salidas Hoy</h3>
          <small>Estos son los visitantes que tienen </small>
        </div>
        <div className="box-body p-a b-b">
          <table className="table table-striped">
            <thead>
              <tr>
              <th>Nombre</th>
              <th>Status</th>
              <th>Entrada</th>
              </tr>
            </thead>
            <tbody>
              { visitors }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitors: state.visitors,
    visitorNumber: Object.keys(state.visitors).length
  };
}, { fetchVisitors })(VisitorList);
