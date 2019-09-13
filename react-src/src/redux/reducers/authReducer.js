import { types } from "../actions/authActions";

const initialState = {
  name: "",
  token: null,
  isLogged: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.SET_TOKEN}_SUCCESS`: {
      return {
        ...state,
        ...action.payload,
        isLogged: true
      };
    }
    default:
      return state;
  }
}
