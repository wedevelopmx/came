import _ from 'lodash';
import { FETCH_COMMENTS, CREATE_COMMENT } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_COMMENTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
