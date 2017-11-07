import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchAppointments } from '../actions';

class AppointmentsList extends Component {
  componentWillMount() {
    moment.locale('es');
    this.props.fetchAppointments({ startDate: "2017-11-05" });
  }

  render() {
    if(!this.props.appointments)
      return;

    const visitors = this.props.appointments.map((appointment) => {
      return (
        <tr key={appointment.startDate}>
          <td>{ `${appointment.firstName} ${appointment.lastName}` }</td>
          <td>
            <span>{ appointment.reason }</span>
            <small className="block text-muted text-ellipsis">{ appointment.serviceName }</small>
          </td>
          <td>{ moment(new Date(appointment.startDate)).format("ddd, hA") }</td>
        </tr>
      );
    });

    return (
      <div className="box m-t-sm">
        <div className="box-header dker">
          <h3>Citas Hoy</h3>
          <small>Citas de acompañamiento para el dia de hoy.</small>
        </div>
        <div className="box-body p-a b-b">
          <table className="table table-striped">
            <thead>
              <tr>
              <th>Nombre</th>
              <th>Acompañamiento</th>
              <th>Fecha</th>
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
    appointments: state.appointments
  };
}, { fetchAppointments })(AppointmentsList);
