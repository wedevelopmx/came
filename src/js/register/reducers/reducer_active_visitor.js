import { VISITOR_SELECTED } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case VISITOR_SELECTED:
      return action.payload;
  }
  
  return state;
}
