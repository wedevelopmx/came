import axios from 'axios';

export const CREATE_CHECKOUT = 'create_checkout';
export const UPDATE_CHECKOUT = 'update_checkout';
export const FETCH_CHECKOUTS = 'fetch_checkouts';

const API_URL = '/api/checkout';

export function createCheckout(checkout, callback) {
  const request = axios.post(API_URL, checkout);
  request.then(() => callback());

  return {
    type: CREATE_CHECKOUT,
    payload: request
  };
}

export function updateCheckout(checkout, callback) {
  const request = axios.put(API_URL + `/${checkout.id}`, checkout)
  request.then(() => callback());

  return {
    type: UPDATE_CHECKOUT,
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
