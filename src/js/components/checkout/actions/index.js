import axios from 'axios';

export const CREATE_CHECKOUT = 'create_checkout';
export const FETCH_CHECKOUTS = 'fetch_checkouts';

const API_URL = '/api/checkout';

export function createExit(checkout, callback) {
  const request = axios.post(API_URL, checkout)
  .then(function(checkout) {
    callback();
  });

  return {
    type: CREATE_CHECKOUT,
    payload: request
  };
}

export function fetchCheckouts(visitorId) {
  const request = axios.get(API_URL + '/' + visitorId);
  return {
    type: FETCH_CHECKOUTS,
    payload: request
  }
}
