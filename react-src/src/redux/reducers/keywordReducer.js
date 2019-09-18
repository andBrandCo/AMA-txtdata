import { types } from "../actions/editDataActions";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.SEND_KEYWORD}_SUCCESS`: {
      return {
        ...action.payload
      };
    }
    case `${types.SEND_AUTO_RESPONSE}_SUCCESS`: {
      return {
        ...state,
        autoResponse: action.payload.autoResponse
      };
    }
    default:
      return state;
  }
}
