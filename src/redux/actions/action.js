export const ADD_USER = 'ADD_USER';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';
export const actionAddUser = (user) => ({ type: ADD_USER, user });
export const actionScore = (score) => ({ type: SCORE, score });
export const actionAssertions = (assertion) => ({ type: ASSERTIONS, assertion });
export const actionResetScore = () => ({ type: RESET_SCORE });
