import axios from 'axios';

export const PROFILE_PIC_SET = 'pic_profile_set';
export const CREATE_VISITOR = 'create_visitor';
export const FETCH_VISITORS = 'fetch_visitors';
export const VISITOR_SELECTED = 'visitor_selected';

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

export function setProfilePic(blob) {
  return {
    type: PROFILE_PIC_SET,
    payload: blob
  }
}

export function createVisitor(visitor, callback) {
  const request = axios.post(API_URL, visitor);
  request.then(function(visitor) {
    callback();
  });

  return {
    type: CREATE_VISITOR,
    payload: request
  };
}

export function fetchGender() {
  const request = axios.get(API_URL);
  return {
    type: FETCH_VISITORS,
    payload: request
  }
}
