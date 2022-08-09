export const ADD_USER = 'ADD_USER';
export const SCORE = 'SCORE';
export const actionAddUser = (user) => ({ type: ADD_USER, user });
export const actionScore = (score) => ({ type: SCORE, score });
