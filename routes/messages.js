const express = require("express");
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
// const RateLimit = require('express-rate-limit');
const MessageController = require("../controllers/message-controller");
const Message = require("../models/message");
const { authMiddleware } = require("../middleware/authMiddleware");
// const { twilioMiddleware } = require("../middleware/twilioMiddleware");

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/twilio/", (req, res) => {
  let newMessage = new Message({
    // date: req.body.date,
    shortCode: req.body.shortCode,
    keyword: req.body.keyword,
    phoneID: req.body.phoneID,
    URLSent: req.body.URLSent,
    mobileNumber: req.body.mobileNumber,
    autoResponse: req.body.autoResponse
  });

  newMessage
    .save()
    .then(result => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          // date: result.date,
          shortCode: result.shortCode,
          keyword: result.keyword,
          phoneID: result.phoneID,
          autoResponse: result.autoResponse
        }
      });
    })
    .catch(err => {
      console.log("err - ", err);
      res.status(404).json({ success: false, msg: `Something wrong.` });
    });
});

router.post("/message", urlencodedParser, (...args) => {
  try {
    new MessageController().findMessagesByKeyword(...args);
  } catch (e) {
    console.log("rout error", e);
  }
});

router.put("/:id", authMiddleware, (...args) => {
  try {
    new MessageController().updateRow(...args);
  } catch (e) {
    console.log("rout update message error", e);
  }
});
router.delete("/:id", authMiddleware, (...args) => {
  try {
    new MessageController().deleteRow(...args);
  } catch (e) {
    console.log("rout delete error", e);
  }
});
router.post("/row", authMiddleware, (...args) => {
  try {
    new MessageController().createRow(...args);
  } catch (e) {
    console.log("rout create error", e);
  }
});
router.get("/", authMiddleware, (...args) =>
  new MessageController().getAllMessages(...args)
);

module.exports = router;
