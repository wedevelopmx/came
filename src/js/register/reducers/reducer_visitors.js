import _ from 'lodash';
import { FETCH_VISITORS, CREATE_VISITOR } from '../actions';

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_VISITORS:
      console.log(action.payload.data);
      return _.mapKeys(action.payload.data, 'id');
    case CREATE_VISITOR:
      return { ...state, [action.payload.data.id]: action.payload.data };
    default:
      return state;
  }
}
