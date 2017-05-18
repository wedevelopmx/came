export const VISITOR_SELECTED = 'visitor_selected';
export const CREATE_VISITOR = 'create_visitor';
export const FETCH_VISITORS = 'fetch_visitors';

export function fetchVisitors() {
  console.log('fetchVisitors')
  //TODO: API GET /visitor
  return {
    type: FETCH_VISITORS,
    payload: [{
      id: 1,
      avatar: './images/profile.png',
      name: 'Cristian Colorado',
      state: 'San Luis Potosi',
      country: 'Mexico'
    }, {
      id: 2,
      avatar: './images/profile.png',
      name: 'Andres Delgadillo',
      state: 'Caracas',
      country: 'Venezuela'
    }]
  }
}

export function createVisitor(visitor, callback) {
  //TODO: API POST /visitor
  visitor['id'] = 1;
  callback();
  return {
    type: CREATE_VISITOR,
    payload: visitor
  };
}

export function selectVisitor(visitor) {
  console.log('selectVisitor')
  return {
    type: VISITOR_SELECTED,
    payload: visitor
  };
}
