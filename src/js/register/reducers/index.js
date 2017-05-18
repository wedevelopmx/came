import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import VisitorsReducer from './reducer_visitors';
import ActiveVisitorReducer from './reducer_active_visitor';

const rootReducer = combineReducers({
  visitors: VisitorsReducer,
  activeVisitor: ActiveVisitorReducer,
  form: formReducer
});

export default rootReducer;
