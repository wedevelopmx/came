import axios from 'axios';

export const CREATE_COMMENT = 'create_comment';
export const FETCH_COMMENTS = 'fetch_comments';

const API_URL = '/api/comment';

export function createComment(comment, callback) {
  const request = axios.post(API_URL, comment)
  .then(function(comment) {
    callback();
  });

  return {
    type: CREATE_COMMENT,
    payload: request
  };
}

export function fetchComments(visitorId) {
  const request = axios.get(API_URL + '/' + visitorId);
  return {
    type: FETCH_COMMENTS,
    payload: request
  }
}
