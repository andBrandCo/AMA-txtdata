import { types } from "../actions/editDataActions";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_MESSAGE_LIST}_SUCCESS`: {
      return [...action.payload];
    }
    case `${types.SEND_KEYWORD}_SUCCESS`: {
      if (!state.some(({ keyword }) => keyword === action.payload.keyword)) {
        state.push(action.payload);
      }
      return state;
    }
    case `${types.SEND_AUTO_RESPONSE}_SUCCESS`: {
      const newState = state.map(elem => {
        if (elem._id === action.payload._id) {
          elem.autoResponse = action.payload.autoResponse;
        }
        return elem;
      });
      return newState;
    }
    default:
      return state;
  }
}
