import _ from 'lodash';
import { FETCH_VISITORS, CREATE_VISITOR } from '../actions';

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_VISITORS:
      return _.mapKeys(action.payload, 'id');
    case CREATE_VISITOR:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
