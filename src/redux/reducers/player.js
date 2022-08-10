import { combineReducers } from 'redux';
import { ADD_USER, RESET_SCORE, SCORE } from '../actions/action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  const { user, score, acerto } = action;
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
  // case ASSERTIONS:
  //   return { ...state,
  //     assertions: action.assertion,
  //   };
  case RESET_SCORE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player: playerReducer });

export default rootReducer;
