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
    request.delete();

    delete data._id;

    // Do the upsert, which works like this: If no Contact document exists with 
    // _id = contact.id, then create a new doc using upsertData.
    // Otherwise, update the existing doc with upsertData
    request.update({_id: data._id}, data, {upsert: true});
    //await request
    await request.save();
    console.log(request);
    return request;
  }


  async getAllRecordList() {
    return await allRequest.find({});
  }
}

module.exports = RecordService;
