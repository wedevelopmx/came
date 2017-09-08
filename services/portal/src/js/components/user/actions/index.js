import axios from 'axios';

const USER_URL = '/api/user';

export const FETCH_USERS = 'fetch_users';
export const DELETE_USER = 'delete_users';
export const UPDATE_USER = 'update_user';
export const SET_ACTIVE_USER = 'set_active_user';
export const UPDATE_ROLE = 'update_role';

export function fetchUsers() {
  const request = axios.get(USER_URL);
  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function deleteUser(user) {
  const request = axios.delete(`${USER_URL}/${user._id}`);
  return {
    type: DELETE_USER,
    payload: request
  }
}

export function setActiveUser(user) {
  return {
    type: SET_ACTIVE_USER,
    payload: user
  }
}

export function updateRole(userId, role) {
  return {
    type: UPDATE_ROLE,
    payload: { userId, role }
  }
}

export function updateUser(user, callback) {
  const request = axios.put(`${USER_URL}/${user._id}`, user).then(callback);
  return {
    type: UPDATE_USER,
    payload: request
  }
}
