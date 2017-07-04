import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, VisitorSelectedReducer,
  RegisterFormReducer, FetchCategories } from 'search/reducers';
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
  categories: FetchCategories,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer,
  checkouts: CheckoutsReducer,
  appointments: AppointmentReducer,
  categoryEntities: CategoryEntitiesReducer,
  form: formReducer.plugin({
    RegisterForm: RegisterFormReducer
  })
});

export default rootReducer;
