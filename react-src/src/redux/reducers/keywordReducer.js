import { types } from "../actions/editDataActions";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.SEND_KEYWORD}_SUCCESS`: {
      return {
        ...action.payload
      };
    }
    case `${types.UPDATE_ROW}_SUCCESS`: {
      return {
        ...action.payload
      };
    }
    default:
      return state;
  }
}
