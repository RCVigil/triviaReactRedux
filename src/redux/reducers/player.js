import { ADD_USER } from '../actions/action';

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
  default:
    return state;
  }
};

export default playerReducer;
