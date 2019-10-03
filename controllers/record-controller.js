const recordService = require("../services/recordService");
const sftpService = require("../services/sftpService");
const RecordService = new recordService();
const SFTPService = new sftpService();
const { convertToCSV } = require("../tools/fh-json2csv");

class RecordController {
  async getAllRecord(req, res) {
    const recordList = await RecordService.getAllRecordList();

    recordList
      ? res.json(recordList)
      : res.status(500).json({ success: false, msg: `Something went wrong. ` });
  }
  async getAllRecordCSV(req, res) {
    const recordList = await RecordService.getAllRecordList();
    const csvData = convertToCSV(recordList);

    // -> Send CSV File to Client
    res.setHeader("Content-disposition", "attachment; filename=records.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).end(csvData);
  }
  async sendToServerAllRecordCSV(req, res) {
    const recordList = await RecordService.getAllRecordList();
    const csvData = convertToCSV(recordList);
    console.log("ready to send sftp req!");
    SFTPService.sendAllRecord(csvData, res);
    // console.log("result- ", result);

    // res.send("ok");
    // -> Send CSV File to Client
    // res.setHeader("Content-disposition", "attachment; filename=records.csv");
    // res.set("Content-Type", "text/csv");
    // res.status(200).end(csvData);
  }
}

module.exports = RecordController;
