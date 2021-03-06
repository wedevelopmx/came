import _ from 'lodash';
import { FETCH_CATEGORIES, CREATE_CATEGORY, SELECT_CATEGORY, CREATE_CATEGORY_ENTITY, UPDATE_CATEGORY_ENTITY } from '../actions';

import { APPOINTMENT_CATALOG } from '../actions';

export function CategoriesReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_CATEGORY_ENTITY:
      state[action.payload.data.name] = action.payload.data;
      return {...state};
    case CREATE_CATEGORY_ENTITY:
      return { ...state, [action.payload.data.name]: action.payload.data };
    case CREATE_CATEGORY:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_CATEGORIES:
      return _.mapKeys(action.payload.data, 'name');
    default:
      return state;
  }
}

export function ActiveCategoryReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_CATEGORY_ENTITY:
    case CREATE_CATEGORY_ENTITY:
      return {...action.payload.data};
    case FETCH_CATEGORIES:
      return action.payload.data.length != 0 ? action.payload.data[0] : {};
    case SELECT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

export function AppointmentCatalog(state = {}, action) {
  switch (action.type) {
    case APPOINTMENT_CATALOG:
      return _.groupBy(action.payload.data, 'service');
    default:
      return state;
  }
}
