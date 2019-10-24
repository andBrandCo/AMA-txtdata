let Client = require("ssh2-sftp-client");
let client = new Client();

const FTPClient = require("ftp");
var fs = require("fs");

class SFTPService {
  sendAllRecord(csvData, res) {
    let remoteFile = process.env.REMOTE_PC_PASS_TO_SAVE_REPORT;
    const readStream = new Buffer.from(csvData);

    client
      .connect({
        host: process.env.REMOTE_PC_HOST,
        port: process.env.REMOTE_PC_PORT,
        username: process.env.REMOTE_PC_SERVER_NAME,
        password: process.env.REMOTE_PC_PASSWORD
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

  sendAllRecordByFTP(csvData, res) {
    const date = new Date();
    let remoteFile = `/AMA SMS/list-${date.toDateString()}.csv`;
    const readStream = new Buffer.from(csvData);
    console.log("remoteFile- ", remoteFile);

    const c = new FTPClient();
    c.on("ready", function() {
      c.put(readStream, remoteFile, function(err) {
        if (err) {
          res.status(400).send(err);
          throw err;
        }
        c.end();
        return res.status(200).send("Success!");
      });
    });

    c.connect({
      host: process.env.REMOTE_PC_HOST,
      port: process.env.REMOTE_PC_PORT,
      user: process.env.REMOTE_PC_SERVER_NAME,
      password: process.env.REMOTE_PC_PASSWORD
    });
  }
}

module.exports = SFTPService;
