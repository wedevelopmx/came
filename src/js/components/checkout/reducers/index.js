import _ from 'lodash';
import { FETCH_CHECKOUTS, CREATE_CHECKOUT, UPDATE_CHECKOUT } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_CHECKOUT:
      return { ..._.omit(state, action.payload), [action.payload.data.id]: action.payload.data };
    case CREATE_CHECKOUT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_CHECKOUTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
