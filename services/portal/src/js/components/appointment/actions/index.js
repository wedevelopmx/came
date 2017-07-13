import axios from 'axios';

export const UPDATE_APPOINTMENT = 'update_appointment';
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

export function fetchAppointmentsByVisitorId(visitorId) {
  const request = axios.get(`/api/visitor/${visitorId}/appointments`);
  return {
    type: FETCH_APPOINTMENTS,
    payload: request
  }
}

export function updateAppointment(appointment, callback){
  const request = axios.put(`${API_URL}/${appointment.id}`, appointment)
  request.then(function(appointment) {
    callback();
  });

  return {
    type: UPDATE_APPOINTMENT,
    payload: request
  }
}

export const SELECT_REASON = 'select_reason';

export function selectReason(reason) {
  return {
    type: SELECT_REASON,
    payload: reason
  }
}
