const allRequest = require("../models/allRequest");

class RecordService {
  async addRow(data) {
    console.log("REQ service add row DATA - ", data);

    const request = new allRequest(data);
    console.log("new request - ", request);
    await request.save();
    return request;
  }

  async getAllRecordList() {
    return await allRequest.find({});
  }
}

module.exports = RecordService;
