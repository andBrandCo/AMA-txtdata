const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
// const validate = require("mongoose-validator");

// Define the database model
const MessageSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  shortCode: {
    type: Number
  },
  keyword: {
    type: String
  },
  phoneID: {
    type: Number
    // unique: true
  },
  URLSent: {
    type: String
  },
  mobileNumber: {
    type: Number
  },
  autoResponse: {
    type: String
  }
});

// Use the unique validator plugin
// UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Message = (module.exports = mongoose.model("message", MessageSchema));
