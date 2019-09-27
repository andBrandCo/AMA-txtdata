import APIService from "./APIService";

export default class editDBDataService extends APIService {
  static sendKeyword(query) {
    return this.post("/api/messages/message", query);
  }
  static getMessageList() {
    return this.get("/api/messages/");
  }

  static updateRow(query) {
    return this.put(`/api/messages/${query.id}`, query);
  }
  static deleteRow(query) {
    return this.delete(`/api/messages/${query.id}`);
  }
  static createRow(query) {
    return this.post(`/api/messages/row`, query);
  }
}
