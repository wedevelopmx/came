import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import { CategoriesReducer, ActiveCategoryReducer, CategoryEntitiesReducer } from 'category/reducers';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  category: ActiveCategoryReducer,
  categoryEntities: CategoryEntitiesReducer,
  form: formReducer
});

export default rootReducer;
