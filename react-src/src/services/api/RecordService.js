import APIService from "./APIService";

export default class RecordService extends APIService {
  static getAllRecordList() {
    return this.get("/api/records/");
  }
  static getAllRecordCSVList() {
    return this.get("/api/records/download/csv");
  }
  static sendReportToServer() {
    return this.get("/api/records/send-to-server/csv");
  }
}
