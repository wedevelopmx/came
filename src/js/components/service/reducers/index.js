import _ from 'lodash';
import { FETCH_SERVICES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SERVICES:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
