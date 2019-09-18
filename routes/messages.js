const express = require("express");
const router = express.Router();
// const RateLimit = require('express-rate-limit');
// const mongoose = require('mongoose');
const MessageController = require("../controllers/message-controller");
const Message = require("../models/message");

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

router.post("/message", (...args) =>
  new MessageController().findMessagesByKeyword(...args)
);
router.post("/auto-response", (...args) =>
  new MessageController().addAutoResponse(...args)
);
router.get("/", (...args) => new MessageController().getAllMessages(...args));

module.exports = router;
