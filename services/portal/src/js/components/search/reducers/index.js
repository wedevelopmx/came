import _ from 'lodash';

import { FETCH_VISITORS, VISITOR_SELECTED, PROFILE_PIC_SET, CREATE_VISITOR,
  FETCH_CATEOGRIES, FETCH_COUNTRIES, FETCH_CITIES, SELECT_COUNTRY, SAVE_DEPARTURE,
  REMOVE_SEARCH_CRITERIA, ORDER_SEARCH_CRITERIA } from '../actions';

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
    case SAVE_DEPARTURE:
      state[action.payload.data.VisitorId].departure = action.payload.data;
      return { ...state };
    case CREATE_VISITOR:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_VISITORS:
      console.log('visitors', action.payload.data.results)
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
            profilePic: action.payload // <----- copy picture into profilePic field
          },
          fields: {
            ...state.fields//,
          }
        }
    break;
    case SELECT_COUNTRY:
      return {
          ...state,
          values: {
            ...state.values,
            coutry: action.payload // <----- copy selected state into state field
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

export function FetchCountries(state =[], action) {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return action.payload.data;
    default:
      return state;
  }
}

export function FetchCities(state =[], action) {
  switch (action.type) {
    case FETCH_CITIES:
      return action.payload.data;
    default:
      return state;
  }
}


export function SearchBarFormReducer(state, action) {
  switch(action.type) {
    // Allow to update hidden field
    case REMOVE_SEARCH_CRITERIA:
      delete state.values[action.payload];
      return {
          ...state,
          values: {
            ...state.values
          },
          fields: {
            ...state.fields
          }
        };
    break;
  case ORDER_SEARCH_CRITERIA:
  return {
      ...state,
      values: {
        ...state.values,
        orderBy: action.payload.field,
        order: action.payload.order
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
