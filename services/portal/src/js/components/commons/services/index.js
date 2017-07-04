import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

moment.locale('es');

export function isOverdue(appointment) {
  if(appointment.endDate) {
    return moment(appointment.endDate).isAfter(appointment.scheduleEndDate);
  } else {
    return moment(new Date()).isAfter(appointment.scheduleEndDate);
  }
}

export function convertToEvent(appointments) {
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
