import APIService from "./APIService";

export default class editDBDataService extends APIService {
  static sendKeyword(query) {
    return this.post("/api/messages/message", query);
  }
  static getMessageList() {
    return this.get("/api/messages/");
  }
  static sendAutoResponse(query) {
    return this.post("/api/messages/auto-response", query);
  }
  static updateURLSent(query) {
    return this.put("/api/messages/url-sent", query);
  }
}
