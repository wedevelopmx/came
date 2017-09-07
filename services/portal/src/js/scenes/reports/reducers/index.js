import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, FetchOrderedVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, FetchCategories, SearchBarFormReducer } from 'search/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  orderedVisitors: FetchOrderedVisitorsReducer,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  categories: FetchCategories,
  form: formReducer.plugin({
    InlineSearchBar: SearchBarFormReducer
  })
});

export default rootReducer;
