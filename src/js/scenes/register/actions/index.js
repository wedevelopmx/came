import axios from 'axios';

export const PROFILE_PIC_SET = 'pic_profile_set';
export const CREATE_VISITOR = 'create_visitor';

const API_URL = '/api/visitor';

export function setProfilePic(blob) {
  return {
    type: PROFILE_PIC_SET,
    payload: blob
  }
}

export function createVisitor(visitor, callback) {
  const request = axios.post(API_URL, visitor).then(function(visitor) {
    callback();
  });

  return {
    type: CREATE_VISITOR,
    payload: request
  };
}
