import _ from 'lodash';

import { FETCH_VISITORS, VISITOR_SELECTED, PROFILE_PIC_SET, CREATE_VISITOR, FETCH_GENDER, FETCH_STATUS } from '../actions';


export function VisitorSelectedReducer(state = null, action) {
  switch (action.type) {
    case VISITOR_SELECTED:
      return action.payload;
    default:
      return state;
  }
}


export function FetchVisitorsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_VISITOR:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_VISITORS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

export function RegisterFormReducer(state, action) {
  switch(action.type) {
    // Allow to update hidden field
    case PROFILE_PIC_SET:
      return {
          ...state,
          values: {
            ...state.values,
            profilePic: action.payload // <----- clear password value
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

export function FetchGenderReducer(state = [], action) {
  switch (action.type) {
    case FETCH_GENDER:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

export function FetchStatusReducer(state = [], action) {
  switch (action.type) {
    case FETCH_STATUS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
