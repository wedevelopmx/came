import _ from 'lodash';
import { FETCH_APPOINTMENTS, CREATE_APPOINTMENT, UPDATE_APPOINTMENT } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_APPOINTMENT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_APPOINTMENTS:
      return _.mapKeys(action.payload.data, 'id');
    case UPDATE_APPOINTMENT:
      return { ..._.omit(state, action.payload), [action.payload.data.id]: action.payload.data };
    default:
      return state;
  }
}