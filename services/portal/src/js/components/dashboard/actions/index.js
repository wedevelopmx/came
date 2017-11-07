import axios from 'axios';

export const FETCH_VISITORS = 'fetch_visitors';
export const FETCH_APPOINTMENTS = 'fetch_appointments';

export function fetchVisitors(params = {}) {
  const request = axios.get('/api/visitor', { params });
  return {
    type: FETCH_VISITORS,
    payload: request
  }
}

export function fetchAppointments(params = {}) {
  const request = axios.get('/api/appointment', { params });
  return {
    type: FETCH_APPOINTMENTS,
    payload: request
  }
}
