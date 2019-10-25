const allRequest = require("../models/allRequest");

class RecordService {
  async addRow(data) {
    console.log("REQ service add row DATA - ", data);

    const request = new allRequest(data);
    console.log("new request - ", request);
    request.uid = request._id;
    await request.save();
    // console.log(request);
    return request;
  }
  async updateRow(id, data) {
    console.log("REQ service update row DATA - ", data);

    var q = allRequest.where({ uid: id });

    q.updateOne({ $set: data }).exec();
  }

  async getAllRecordList(params = {}) {
    return await allRequest.find(params);
  }

  async getRecordListForTheLastDays(numberOfDays) {
    console.log("start service");

    return await allRequest
      .find({
        createdAt: {
          $gte: new Date(
            new Date().getTime() - numberOfDays * 24 * 60 * 60 * 1000
          )
        }
      })
      .sort({ createdAt: "desc" })
      .lean()
      .exec();
  }
}

module.exports = RecordService;
