import { types } from "../actions/recordsActions";
// import { types as wsTypes } from "../actions/webSocketActions";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ALL_RECORD}_SUCCESS`: {
      return [...action.payload];
    }
    // case wsTypes.GET_NEW_RECORD: {
    //   return state.concat(action.payload);
    // }
    default:
      return state;
  }
}
