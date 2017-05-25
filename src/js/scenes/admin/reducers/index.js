import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import { FetchVisitorsReducer, VisitorSelectedReducer } from 'search/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  activeVisitor: VisitorSelectedReducer
});

export default rootReducer;
