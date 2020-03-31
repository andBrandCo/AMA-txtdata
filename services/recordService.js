const allRequest = require("../models/allRequest");

class RecordService {
  async addRow(data) {
    console.log("REQ service add row DATA - ", data);

    const request = new allRequest(data);
    console.log("new request - ", request);
    // request.uid = request._id;
    request.uid = data.uid;
    await request.save();
    // console.log(request);
    return request;
  }
  async updateRow(id, data) {
    console.log("REQ service update row DATA - ", data);

    // var q = allRequest.where({ uid: id });
    var q = allRequest.where({ _id: id });

    q.updateOne({ $set: data }).exec();
  }

  async getAllRecordList(params = { }) {
    return await allRequest.find(params);
  }

  async getRecordListByQuery(params = { }) {
    return await allRequest.find(params);
  }

  async getRecordListCustomReport(numberOfDays,isPrimary) {
    console.log("start service");

    let mongoQuery = {}
  
    if( isPrimary === 'true' ){
      mongoQuery = {
        createdAt: {
          $gte: new Date(
            new Date().getTime() - numberOfDays * 24 * 60 * 60 * 1000
          )
        }, isPrimaryReport:  {$ne: false }
      }
    } else {
      mongoQuery = {
        createdAt: {
          $gte: new Date(
            new Date().getTime() - numberOfDays * 24 * 60 * 60 * 1000
          )
        }, isPrimaryReport : { $eq : false } 
      }


    }
    
      return await allRequest
      .find(mongoQuery)
      .sort({ createdAt: "desc" })
      .lean()
      .exec();
   }
    
}

module.exports = RecordService;
