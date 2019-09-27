import { types } from "../actions/editDataActions";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_MESSAGE_LIST}_SUCCESS`: {
      return [...action.payload];
    }
    case `${types.SEND_KEYWORD}_SUCCESS`: {
      if (!state.some(({ keyword }) => keyword === action.payload.keyword)) {
        return state.concat(action.payload);
      }
      return state;
    }
    case `${types.UPDATE_ROW}_SUCCESS`: {
      const newState = state.map(elem => {
        if (elem.id === action.payload.id) {
          elem = action.payload;
        }
        return elem;
      });
      return newState;
    }
    case `${types.DELETE_ROW}_SUCCESS`: {
      const newState = state.filter(elem => elem.id !== action.payload.id);
      return newState;
    }
    case `${types.CREATE_ROW}_SUCCESS`: {
      return state.concat(action.payload);
    }
    default:
      return state;
  }
}
