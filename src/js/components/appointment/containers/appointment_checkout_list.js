import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentsByVisitorId } from '../actions';
import { HourGlass } from 'commons/loaders';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

function isOverdue(appointment) {
  if(appointment.endDate) {
    return moment(appointment.endDate).isAfter(appointment.scheduleEndDate);
  } else {
    return moment(new Date()).isAfter(appointment.scheduleEndDate);
  }
}

function convert(appointments) {
  let now = new Date();

  return _.map(appointments, appointment => {
    let inProgress = moment().range(appointment.startDate, appointment.scheduleEndDate);
    let event = { icon : { color : 'lime', material: 'alert' }, time: 'None', reference: appointment, order: new Date(appointment.startDate).getTime() };

    if(inProgress.contains(now)) { // Appointment is in progress
      event.icon.color = isOverdue(appointment) ? 'red' : 'yellow';
      event.icon.material = 'directions_walk';
      event.time = 'Vence ' + moment(new Date(appointment.scheduleEndDate)).fromNow(true);
    } else if(moment(appointment.scheduleEndDate).isAfter(now)) { // Appointment in future
      event.icon.color = 'green';
      event.icon.material = 'alarm_off';
      event.time = moment(new Date(appointment.startDate)).format('ddd, MMMM Do YYYY, h:mm a');
    } else { // Appointment in past
      let overdue = isOverdue(appointment);
      event.icon.color = overdue ? 'red' : 'blue';
      event.icon.material = 'alarm_on';
      event.time = moment(new Date(appointment.startDate)).format('ddd, MMMM Do YYYY, h:mm a') + ' - ' + moment(new Date(appointment.endDate)).format('h:mm a');
      if(overdue) {
        event.time += ' llego ' + moment(new Date(appointment.endDate)).format('ddd, MMMM Do, h:mm a');
      }
    }

    return event;
  });
}

class AppointmentCheckoutList extends Component {
  componentDidMount() {
    moment.locale('es');
    this.props.fetchAppointmentsByVisitorId(this.props.visitor.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.visitor && nextProps.visitor.id !== this.props.visitor.id) {
      this.props.fetchAppointmentsByVisitorId(nextProps.visitor.id);
    }
  }

  renderCheckouts() {
    let _self = this;
    let events = _.orderBy(convert(this.props.appointments), ['order'], ['desc']);

    return _.map(events, event => {
      const className = `w-40 circle ${event.icon.color}`;

      return (
        <div key={event.reference.id} className="sl-item">
          <div className="sl-left">
            <span className={className} onClick={ () => _self.props.onUpdate(event.reference) }>
              <i className="material-icons">{event.icon.material}</i>
            </span>
          </div>
          <div className="sl-content">
            <div className="sl-date text-muted">
              { event.time }
            </div>
            <a className="text-info">{ event.reference.reason }</a>
            <div>{ event.reference.comment }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.appointments)
    if(Array.isArray(this.props.appointments))
      return (<HourGlass></HourGlass>);

    if(Object.keys(this.props.appointments).length == 0)
      return (
        <div className="p-a text-center">
          <h6>No existen elementos registrados.</h6>
        </div>
      );

    return (
      <div className="p-a">
        <div className="streamline b-l m-b m-l">
          { this.renderCheckouts() }
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    visitor: state.activeVisitor,
    appointments: state.appointments
  };
}, { fetchAppointmentsByVisitorId })(AppointmentCheckoutList);
