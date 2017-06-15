import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointments } from '../actions';

class AppointmentList extends Component {
  componentDidMount() {
    this.props.fetchAppointments(this.props.parent.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parent && nextProps.parent.id !== this.props.parent.id) {
      this.props.fetchAppointments(nextProps.parent.id);
    }
  }

  renderAppointments() {
    const _self = this;
    const { appointments: appointmentList } = this.props;

    if(Object.keys(appointmentList).length == 0) {
      return (<h4 className="text-center">No existen citas registradas.</h4>);
    }

    return _.map(appointmentList, (appointment) => {
      const className = `w-40 circle ${appointment.endDate ? 'blue' : 'red'}`;
      return (
        <div key={appointment.id} className="sl-item">
          <div className="sl-left">
            <span className={className} onClick={ () => _self.props.onUpdate(appointment) }>
              <i className="material-icons">directions_walk</i>
            </span>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              Salida: { moment(new Date(appointment.startDate)).format('ddd, MMMM Do YYYY, h:mm a') } - Entrada: { moment(new Date(appointment.endDate)).format('ddd, MMMM Do YYYY, h:mm a') }
            </div>
            <a className="text-info">{ appointment.reason }</a>
            <div>{ appointment.comment }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="p-a">
        <div className="streamline b-l m-b m-l">
          { this.renderAppointments() }
        </div>
        <a onClick={ () => this.props.onCreate() } className="md-raised md-mini md-btn md-fab m-b-sm btn-float btn-sm blue">
          <i className="material-icons md-24">add</i>
        </a>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    appointments: state.appointments
  };
}, { fetchAppointments })(AppointmentList);
