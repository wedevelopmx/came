import axios from 'axios';

export const SELECT_CATEGORY = 'select_category';
export const CREATE_CATEGORY = 'create_category';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_CATEGORY_ENTITIES = 'fetch_categoty_entity';
export const CREATE_CATEGORY_ENTITY = 'create_category_entity';

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

export function fetchCategories() {
  const request = axios.get(`${API_URL}?plain=false`);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchCategoryEntities(categoryId) {
  const request = axios.get(`${API_URL}/${categoryId}/entries`);
  return {
    type: FETCH_CATEGORY_ENTITIES,
    payload: request
  };
}

export function createCategoryEntity(entity, callback) {
  const request = axios.post(`${API_URL}/${entity.CategoryId}/entry`, entity);
  request.then(() => callback());

  return {
    type: CREATE_CATEGORY_ENTITY,
    payload: request
  };
}

export function updateCategoryEntity(entity, callback) {
  const request = axios.put(`${API_URL}/${entity.CategoryId}/entry`, entity);
  request.then(() => callback());

  return {
    type: CREATE_CATEGORY_ENTITY,
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
