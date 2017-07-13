import _ from 'lodash';
import { FETCH_APPOINTMENTS, CREATE_APPOINTMENT, UPDATE_APPOINTMENT, SELECT_REASON } from '../actions';

export function AppointmentReducer(state = [], action) {
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

export function AppointmentFormReducer(state = {}, action) {
  switch(action.type) {
    // Allow to update hidden field
    case SELECT_REASON:
      const { startDate } = state.values;
      let scheduleEndDate = startDate instanceof Date ? startDate.getTime() : startDate.toDate().getTime();
      return {
          ...state,
          values: {
            ...state.values,
            reason: action.payload.reason,
            scheduleEndDate: new Date(scheduleEndDate + action.payload.tolerance)
          },
          fields: {
            ...state.fields//,
          }
        }
    break;
    default:
      return state;
  }
}
