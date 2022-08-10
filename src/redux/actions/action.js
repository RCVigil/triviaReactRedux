export const ADD_USER = 'ADD_USER';
export const SCORE = 'SCORE';
export const URL_PICTURE = 'URL_PICTURE';
export const RESET_SCORE = 'RESET_SCORE';
export const actionAddUser = (user) => ({ type: ADD_USER, user });
export const actionScore = (score, acerto) => ({ type: SCORE, score, acerto });
export const actionResetScore = () => ({ type: RESET_SCORE });
export const actionUrl = (url) => ({ type: URL_PICTURE, url });
