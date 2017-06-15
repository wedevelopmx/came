import _ from 'lodash';
import { FETCH_SUPPORTS, CREATE_SUPPORT } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_SUPPORT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_SUPPORTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
