import axios from 'axios';

export const CREATE_APPOINTMENT = 'create_appointment';
export const FETCH_APPOINTMENTS = 'fetch_appointments';

const API_URL = '/api/appointment';

export function createAppointment(appointment, callback) {
  const request = axios.post(API_URL, appointment)
  request.then(function(appointment) {
    callback();
  });

  return {
    type: CREATE_APPOINTMENT,
    payload: request
  };
}

export function fetchAppointments(supportId) {
  const request = axios.get(API_URL + '/' + supportId);
  return {
    type: FETCH_APPOINTMENTS,
    payload: request
  }
}
