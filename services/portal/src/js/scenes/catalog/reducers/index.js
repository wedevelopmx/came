import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { CategoriesReducer, ActiveCategoryReducer } from 'category/reducers';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  category: ActiveCategoryReducer,
  form: formReducer
});

export default rootReducer;
