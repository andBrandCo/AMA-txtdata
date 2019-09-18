import { types } from "../actions/authActions";
import authService from "../../services/auth";

const token = authService.getToken("token");

const initialState = {
  name: "",
  token,
  isLogged: token ? true : false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.SET_TOKEN}_SUCCESS`: {
      return {
        ...state,
        ...action.payload,
        token: action.payload.access_token,
        isLogged: true
      };
    }
    default:
      return state;
  }
}
