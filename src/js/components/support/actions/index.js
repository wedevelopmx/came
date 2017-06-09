import axios from 'axios';

export const CREATE_SUPPORT = 'create_support';
export const FETCH_SUPPORTS = 'fetch_supports';

const API_URL = '/api/support';

export function createSupport(support, callback) {
  const request = axios.post(API_URL, support)
  request.then(function(support) {
    callback();
  });

  return {
    type: CREATE_SUPPORT,
    payload: request
  };
}

export function fetchSupports(visitorId) {
  const request = axios.get(API_URL + '/' + visitorId);
  return {
    type: FETCH_SUPPORTS,
    payload: request
  }
}
