import axios from 'axios';

export const PROFILE_PIC_SET = 'pic_profile_set';
export const CREATE_VISITOR = 'create_visitor';
export const FETCH_VISITORS = 'fetch_visitors';
export const VISITOR_SELECTED = 'visitor_selected';

const API_URL = '/api/visitor';

export function fetchVisitors(params = {}) {
  const request = axios.get(API_URL, { params });
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

export const FETCH_CATEOGRIES = 'fetch_categories';

export function fetchCategories() {
  const request = axios.get(`/api/categories`);
  return {
    type: FETCH_CATEOGRIES,
    payload: request
  };
}
