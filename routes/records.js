const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/record-controller");

router.get("/", (...args) => new RecordController().getAllRecord(...args));
router.get("/download/csv", (...args) =>
  new RecordController().getAllRecordCSV(...args)
);
router.get("/send-to-server/csv", (...args) =>
  new RecordController().sendToServerAllRecordCSV(...args)
);
router.get("/send-to-server/last-records", (...args) =>
  new RecordController().sendToServerLastRecordsCSV(...args)
);

module.exports = router;
