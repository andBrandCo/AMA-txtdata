import { SocketService } from "./SocketService";
import { types } from "../../redux/actions/webSocketActions";

let socket;

export function wsMiddleware({ dispatch, getState }) {
  return next => action => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAA", action);

    switch (action.type) {
      case types.WS_CONNECT_REQUEST: {
        const { token } = getState().auth;
        socket = new SocketService(token, dispatch);
        socket.connect();
        next(action);
        break;
      }

      default: {
        next(action);
        return;
      }
    }
  };
}
