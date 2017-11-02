import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { UserListReducer, ActiveUserReducer } from 'user/reducers';

const rootReducer = combineReducers({
  users: UserListReducer,
  activeUser: ActiveUserReducer,
  form: formReducer
});

export default rootReducer;
