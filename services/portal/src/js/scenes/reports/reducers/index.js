import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, FetchCategories, SearchBarFormReducer } from 'search/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  categories: FetchCategories,
  form: formReducer.plugin({
    InlineSearchBar: SearchBarFormReducer
  })
});

export default rootReducer;
