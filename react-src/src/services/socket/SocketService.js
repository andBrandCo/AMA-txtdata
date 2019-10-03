import io from "socket.io-client";
import { types } from "../../redux/actions/webSocketActions";
// import history from "./history";

export class SocketService {
  token = "";
  socket = null;

  constructor(token, dispatch) {
    this.token = token;
    this.dispatch = dispatch;
    // this.dcb = dcb;
  }

  connect() {
    console.log("connect");
    this.socket = io(`ws://localhost:3000`);
    this.socket.on("new record", record => this.addRecord(record));
  }

  addRecord(record) {
    this.dispatch({ type: types.GET_NEW_RECORD, payload: record });
  }
}
