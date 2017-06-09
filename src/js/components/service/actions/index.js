import axios from 'axios';

export const FETCH_SERVICES = 'fetch_services';

const API_URL = '/api/service';

export function fetchServices() {
  const request = axios.get(API_URL);
  return {
    type: FETCH_SERVICES,
    payload: request
  }
}
