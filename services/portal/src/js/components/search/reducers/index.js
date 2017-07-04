import _ from 'lodash';

import { FETCH_VISITORS, VISITOR_SELECTED, PROFILE_PIC_SET, CREATE_VISITOR, FETCH_CATEOGRIES } from '../actions';

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
      return _.mapKeys(action.payload.data.results, 'id');
    default:
      return state;
  }
}

export function VisitorPaginationReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_VISITORS:
      return action.payload.data.paging;
    default:
    return state;
  }
}

export function VisitorDimReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_VISITORS:
      return {
        size: action.payload.data.size,
        total: action.payload.data.total,
      };
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

export function FetchCategories(state =[], action) {
  switch (action.type) {
    case FETCH_CATEOGRIES:
      return action.payload.data;
    default:
      return state;
  }
}
