import {combineReducers} from 'redux';
import VisitorsReducer from './reducer_visitors';
import ActiveVisitorReducer from './reducer_active_visitor';

const rootReducer = combineReducers({
  visitors: VisitorsReducer,
  activeVisitor: ActiveVisitorReducer
});

export default rootReducer;
