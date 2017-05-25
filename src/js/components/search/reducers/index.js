import _ from 'lodash';

import { FETCH_VISITORS, VISITOR_SELECTED } from '../actions';


export function VisitorSelectedReducer(state = null, action) {
  switch (action.type) {
    case VISITOR_SELECTED:
      return action.payload;
    default:
      return state;
  }
}


export function FetchVisitorsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_VISITORS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
