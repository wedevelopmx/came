import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import { CategoriesReducer, ActiveCategoryReducer, CategoryEntitiesReducer } from 'category/reducers';
import { UserListReducer, ActiveUserReducer } from 'user/reducers';

const rootReducer = combineReducers({
  users: UserListReducer,
  activeUser: ActiveUserReducer,
  categories: CategoriesReducer,
  category: ActiveCategoryReducer,
  categoryEntities: CategoryEntitiesReducer,
  form: formReducer
});

export default rootReducer;
