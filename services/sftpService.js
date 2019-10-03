let Client = require("ssh2-sftp-client");
let client = new Client();

class SFTPService {
  sendAllRecord(csvData, res) {
    let remoteFile = process.env.LOCAL_PASS_TO_SAVE_REPORT;
    const readStream = new Buffer.from(csvData);
    client
      .connect({
        host: "localhost",
        port: "22",
        username: process.env.LOCAL_SERVER_NAME,
        password: process.env.LOCAL_PASS
      })
      .then(() => {
        return client.put(readStream, remoteFile);
      })
      .then(() => {
        client.end();
        return res.status(200).send("Success!");
      })
      .catch(err => {
        console.error(err.message);
        res.status(400).send(err);
      });
  }
}

module.exports = SFTPService;
