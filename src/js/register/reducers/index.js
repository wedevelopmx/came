import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { PROFILE_PIC_SET, VISITOR_SELECTED } from '../actions';
import VisitorsReducer from './reducer_visitors';
import ActiveVisitorReducer from './reducer_active_visitor';
import CommentsReducer from '../../comments/reducers';

const rootReducer = combineReducers({
  comments: CommentsReducer,
  visitors: VisitorsReducer,
  activeVisitor: ActiveVisitorReducer,
  form: formReducer.plugin({
    // Intercepting Form reducer
    RegisterForm: (state, action) => {
      switch(action.type) {
        // Allow to update hidden field
        case PROFILE_PIC_SET:
          return {
              ...state,
              values: {
                ...state.values,
                profilePic: action.payload // <----- clear password value
              },
              fields: {
                ...state.fields//,
              }
            }
        break;
        default:
          return state;
      }
    }
  })
});

export default rootReducer;
