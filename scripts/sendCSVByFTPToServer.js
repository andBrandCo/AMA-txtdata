const { convertToCSV } = require("../tools/fh-json2csv");
const sftpService = require("../services/sftpService");
const SFTPService = new sftpService();
const FTPClient = require("ftp");
var fs = require("fs");
const mongoose = require("mongoose");
const { getFormattedDate } = require("../tools/formattedDate");
require("dotenv").config();
// const unique = require("mongoose-unique-validator");
// const validate = require("mongoose-validator");
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to the database.");
});

db.on("error", err => {
  console.log(`Database error: ${err}`);
});

// Define the database model
const AllRequestSchema = new mongoose.Schema(
  {
    _id: {
      type: Object
    },
    phoneID: {
      type: String
    },
    shortCode: {
      type: String
    },
    keyword: {
      type: String
    },
    mobileNumber: {
      type: String
    },
    urlSent: {
      type: String
    },
    autoResponse: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Use the unique validator plugin
// UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

AllRequestSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

const allRequest = mongoose.model("allRequest", AllRequestSchema);

const sendDataToRemoteServerByFTP = async () => {
  try {
    console.log("script start!");

    const days = 1;
    let fromDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    const currentDate = getFormattedDate(new Date());
    const recordList = await allRequest
      .find({
        createdAt: {
          $gte: fromDate
        }
      })
      .sort({ createdAt: "desc" })
      .lean()
      .exec();

      console.log(recordList);

    const csvData = await convertToCSV(recordList);
    console.log(csvData);
    const note = ` for ${days} day(s)`;
    console.log(note);
    fromDate = getFormattedDate(fromDate);
    console.log(note);
    //let remoteFile = `/AMA SMS/list${note} ${fromDate} - ${currentDate} by script.tsv`;
    let remoteFile = `/AMA SMS/list${note}-${fromDate}-${currentDate}.tsv`;
    const readStream = new Buffer.from(csvData);
    console.log(readStream);

    //SFTPService.sendAllRecordByFTP(csvData, res, NodeFilter);

    const c = new FTPClient();
    c.on("ready", function() {
      c.put(readStream, remoteFile, function(err) {
        if (err) {
          console.log("_______ ", err);
          throw err;
        }
        c.end();
        //return res.status(200).send("Success!");
      });
    });

    c.connect({
      host: process.env.REMOTE_PC_HOST,
      port: process.env.REMOTE_PC_PORT,
      user: process.env.REMOTE_PC_SERVER_NAME,
      password: process.env.REMOTE_PC_PASSWORD
    });

    console.log("FTP fn start in script!");
  } catch (e) {
    console.log("error", e);
  }
};

sendDataToRemoteServerByFTP();
