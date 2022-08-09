import { combineReducers } from 'redux';
import { ADD_USER, SCORE } from '../actions/action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  const { user } = action;
  switch (action.type) {
  case ADD_USER:
    return { ...state,
      name: user.userName,
      gravatarEmail: user.userEmail,
    };
  case SCORE:
    return { ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player: playerReducer });

export default rootReducer;
