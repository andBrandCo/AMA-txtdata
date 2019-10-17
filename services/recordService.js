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
  async updateRow( id, data) {
    console.log("REQ service update row DATA - ", data);
    //data.keyword = "foo";

    const request = new allRequest(data);
    console.log("new request - ", request);
    //request.delete();

    //delete data._id;
    console.log("update");

    //const newData = {  phoneID, urlSent}

    // Do the upsert, which works like this: If no Contact document exists with 
    // _id = contact.id, then create a new doc using upsertData.
    // Otherwise, update the existing doc with upsertData
    //request.update({_id: data._id}, data, {upsert: true}, function((err){}));
    //await request
    await request.update({_id: id}, data, {upsert: true}, function(err, res) {
      // Updated at most one doc, `res.modifiedCount` contains the number
      // of docs that MongoDB updated
      console.log(err)
    });
    await request.update({_id: id}, { urlSent: 'true' });
    //await request.save();
    console.log(request);
    return request;
  }


  async getAllRecordList() {
    return await allRequest.find({});
  }
}

module.exports = RecordService;
