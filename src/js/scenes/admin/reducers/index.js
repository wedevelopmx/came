import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import { FetchVisitorsReducer, VisitorSelectedReducer } from 'search/reducers';
import CommentsReducer from 'comments/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer
});

export default rootReducer;
