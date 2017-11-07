import {combineReducers} from 'redux';
import { FetchVisitorsReducer, FetchAppointmentsReducer } from 'dashboard/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  appointments: FetchAppointmentsReducer
});

export default rootReducer;
