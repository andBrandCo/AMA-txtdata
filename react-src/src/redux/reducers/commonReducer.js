import { types } from "../actions/authActions";

const initialState = {
  recoverPasswordSpinner: false,
  recoverPasswordSuccess: false,
  recoverPasswordError: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case `${types.RECOVER_PASSWORD}_REQUEST`: {
      return {
        ...state,
        recoverPasswordSpinner: true
      };
    }
    case `${types.RECOVER_PASSWORD}_SUCCESS`: {
      return {
        ...state,
        recoverPasswordSpinner: false,
        recoverPasswordSuccess: true
      };
    }
    case `${types.RECOVER_PASSWORD}_FAILED`: {
      return {
        ...state,
        recoverPasswordSpinner: false
      };
    }
    // case `${types.RECOVER_PASSWORD}_FAILED`: {
    //   return {
    //     ...state,
    //     recoverPasswordError: true
    //   };
    // }
    default:
      return state;
  }
}
