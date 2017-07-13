import _ from 'lodash';
import { FETCH_CHECKOUTS, CREATE_CHECKOUT, UPDATE_CHECKOUT, SELECT_REASON } from '../actions';

export function CheckoutsReducer(state = [], action) {
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

export function CheckoutFormReducer(state = {}, action) {
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
