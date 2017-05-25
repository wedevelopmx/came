import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { PROFILE_PIC_SET, VISITOR_SELECTED } from '../actions';

import { FetchVisitorsReducer, VisitorSelectedReducer } from 'search/reducers';

import CommentsReducer from 'comments/reducers';

const rootReducer = combineReducers({
  visitors: FetchVisitorsReducer,
  activeVisitor: VisitorSelectedReducer,
  comments: CommentsReducer,
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
