import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorPaginationReducer, VisitorDimReducer, VisitorSelectedReducer,
  RegisterFormReducer, FetchCategories, FetchCountries, FetchCities } from 'search/reducers';
import CommentsReducer from 'comments/reducers';
import { CheckoutsReducer, CheckoutFormReducer} from 'checkout/reducers';
import SupportReducer from 'support/reducers';
import ServiceReducer from 'service/reducers';
import { AppointmentReducer } from 'appointment/reducers';
import { AppointmentCatalog } from 'category/reducers';

const rootReducer = combineReducers({
  supports: SupportReducer,
  services: ServiceReducer,
  visitors: FetchVisitorsReducer,
  appointmentCatalog: AppointmentCatalog,
  categories: FetchCategories,
  countries: FetchCountries,
  cities: FetchCities,
  pagination: VisitorPaginationReducer,
  displayedVisitors: VisitorDimReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer,
  checkouts: CheckoutsReducer,
  appointments: AppointmentReducer,
  form: formReducer.plugin({
    RegisterForm: RegisterFormReducer,
    CheckoutForm: CheckoutFormReducer
  })
});

export default rootReducer;
