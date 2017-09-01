import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, FetchCategories } from 'search/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  categories: FetchCategories,
});

export default rootReducer;
