export const ADD_USER = 'ADD_USER';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';
export const actionAddUser = (user) => ({ type: ADD_USER, user });
export const actionScore = (score) => ({ type: SCORE, score });
export const actionAssertions = (assertion) => ({ type: ASSERTIONS, assertion });
