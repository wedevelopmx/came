import _ from 'lodash';
import { FETCH_USERS, UPDATE_USER, DELETE_USER, SET_ACTIVE_USER, UPDATE_ROLE } from '../actions';

function updateRole(roles, role) {
  if(roles.some(currentRole => currentRole == role )) {
    return  roles.filter( currentRole => currentRole != role )
  } else {
    roles.push(role);
  }
  return roles;
}

export function UserListReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload.data, '_id');
    case UPDATE_USER:
      state[action.payload.data._id] = action.payload.data;
      return state;
    case DELETE_USER:
      return _.omit(state, action.payload.data._id) ;
    case UPDATE_ROLE:
      state[action.payload.userId].roles = updateRole(state[action.payload.userId].roles, action.payload.role);
      return state;
    default:
      return state;
  }
}

export function ActiveUserReducer(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_USER:
        return action.payload;
      break;
    default:
      return state;
  }
}
