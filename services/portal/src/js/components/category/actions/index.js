import axios from 'axios';

export const SELECT_CATEGORY = 'select_category';
export const CREATE_CATEGORY = 'create_category';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_CATEGORY_ENTITIES = 'fetch_categoty_entity';
export const CREATE_CATEGORY_ENTITY = 'create_category_entity';
export const UPDATE_CATEGORY_ENTITY = 'update_category_entity';

const API_URL = '/api/categories';

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    payload: category
  };
}

export function createCategory(category, callback) {
  const request = axios.post(API_URL, category);
  request.then(() => callback());

  return {
    type: CREATE_CATEGORY,
    payload: request
  };
}

export function fetchCategories(plain = true) {
  const request = axios.get(`${API_URL}?plain=${plain}`);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function createCategoryEntity(categoryId, entity, callback) {
  const request = axios.post(`${API_URL}/${categoryId}/entry`, entity);
  request.then(() => callback());

  return {
    type: CREATE_CATEGORY_ENTITY,
    payload: request
  };
}

export function updateCategoryEntity(categoryId, entity, callback) {
  const request = axios.put(`${API_URL}/${categoryId}/entry`, entity);
  request.then(() => callback());

  return {
    type: UPDATE_CATEGORY_ENTITY,
    payload: request
  };
}

export const APPOINTMENT_CATALOG = 'appointment_catalog';
const API_APPOINTMENTS_URL = '/api/appointments';

export function fetchAppointmentCatalog() {
  const request = axios.get(API_APPOINTMENTS_URL);

  return {
    type: APPOINTMENT_CATALOG,
    payload: request
  }
}
