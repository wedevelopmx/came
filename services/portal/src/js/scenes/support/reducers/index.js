import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, VisitorSelectedReducer,
  RegisterFormReducer, FetchCategories, FetchCountries, FetchCities } from 'search/reducers';
import CommentsReducer from 'comments/reducers';
import CheckoutsReducer from 'checkout/reducers';
import SupportReducer from 'support/reducers';
import ServiceReducer from 'service/reducers';
import { AppointmentReducer, AppointmentFormReducer } from 'appointment/reducers';
import { CategoryEntitiesReducer, AppointmentCatalog } from 'category/reducers';

const rootReducer = combineReducers({
  supports: SupportReducer,
  services: ServiceReducer,
  visitors: FetchVisitorsReducer,
  categories: FetchCategories,
  appointmentCatalog: AppointmentCatalog,
  countries: FetchCountries,
  cities: FetchCities,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer,
  checkouts: CheckoutsReducer,
  appointments: AppointmentReducer,
  categoryEntities: CategoryEntitiesReducer,
  form: formReducer.plugin({
    RegisterForm: RegisterFormReducer,
    AppointmentForm: AppointmentFormReducer
  })
});

export default rootReducer;
