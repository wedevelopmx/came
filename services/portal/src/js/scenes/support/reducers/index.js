import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, VisitorSelectedReducer, RegisterFormReducer, FetchGenderReducer, FetchStatusReducer } from 'search/reducers';
import CommentsReducer from 'comments/reducers';
import CheckoutsReducer from 'checkout/reducers';
import SupportReducer from 'support/reducers';
import ServiceReducer from 'service/reducers';
import AppointmentReducer from 'appointment/reducers';
import { CategoryEntitiesReducer } from 'category/reducers';

const rootReducer = combineReducers({
  supports: SupportReducer,
  services: ServiceReducer,
  visitors: FetchVisitorsReducer,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer,
  checkouts: CheckoutsReducer,
  appointments: AppointmentReducer,
  categoryEntities: CategoryEntitiesReducer,
  genders: FetchGenderReducer,
  status: FetchStatusReducer,
  form: formReducer.plugin({
    RegisterForm: RegisterFormReducer
  })
});

export default rootReducer;
