import _ from 'lodash';

import { FETCH_VISITORS, FETCH_APPOINTMENTS } from '../actions';

export function FetchVisitorsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_VISITORS:
      return action.payload.data.results;
    default:
      return state;
  }
}

export function FetchAppointmentsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_APPOINTMENTS:
    console.log(action)
      return action.payload.data;
    default:
      return state;
  }
}
