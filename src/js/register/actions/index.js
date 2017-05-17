export function selectVisitor(visitor) {
  return {
    type: 'VISITOR_SELECTED',
    payload: visitor
  };
}
