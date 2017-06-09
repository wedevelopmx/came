import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { FetchVisitorsReducer, VisitorSelectedReducer, RegisterFormReducer } from 'search/reducers';
import CommentsReducer from 'comments/reducers';
import CheckoutsReducer from 'checkout/reducers';
import SupportReducer from 'support/reducers';
import ServiceReducer from 'service/reducers';

const rootReducer = combineReducers({
  supports: SupportReducer,
  services: ServiceReducer,
  visitors: FetchVisitorsReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer,
  checkouts: CheckoutsReducer,
  form: formReducer.plugin({
    RegisterForm: RegisterFormReducer
  })
});

export default rootReducer;
