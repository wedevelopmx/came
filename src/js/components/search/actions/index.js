import axios from 'axios';

export const VISITOR_SELECTED = 'visitor_selected';
export const FETCH_VISITORS = 'fetch_visitors';

const API_URL = '/api/visitor';

export function fetchVisitors() {
  const request = axios.get(API_URL);
  return {
    type: FETCH_VISITORS,
    payload: request
  }
}

export function selectVisitor(visitor) {
  return {
    type: VISITOR_SELECTED,
    payload: visitor
  };
}
