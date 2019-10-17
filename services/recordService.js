const allRequest = require("../models/allRequest");

class RecordService {
  async addRow(data) {
    console.log("REQ service add row DATA - ", data);

    const request = new allRequest(data);
    console.log("new request - ", request);
    await request.save();
    console.log(request);
    return request;
  }
  async updateRow(data) {
    console.log("REQ service update row DATA - ", data);

    const request = new allRequest(data);
    console.log("new request - ", request);
    delete data._id;
    await request.save();
    console.log(request);
    return request;
  }


  async getAllRecordList() {
    return await allRequest.find({});
  }
}

module.exports = RecordService;
