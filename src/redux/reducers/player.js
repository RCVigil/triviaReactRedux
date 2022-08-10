import { combineReducers } from 'redux';
import { ADD_USER, RESET_SCORE, SCORE, URL_PICTURE } from '../actions/action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  const { user, score, acerto, url } = action;
  switch (action.type) {
  case ADD_USER:
    return { ...state,
      name: user.userName,
      gravatarEmail: user.userEmail,
    };
  case SCORE:
    return { ...state,
      score: state.score + score,
      assertions: state.assertions + acerto,
    };
  case URL_PICTURE:
    return { ...state, url };
  case RESET_SCORE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player: playerReducer });

export default rootReducer;
