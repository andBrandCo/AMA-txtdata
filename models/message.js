const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
// const validate = require("mongoose-validator");

// Define the database model
const MessageSchema = new mongoose.Schema(
  {
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
      type: String
      // unique: true
    },
    URLSent: {
      mutableURL: String
      // shortURL: String
    },
    mobileNumber: {
      type: String
    },
    autoResponseBeforeURL: {
      type: String
    },
    autoResponseAfterURL: {
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

MessageSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});
MessageSchema.virtual("URLSent.wholeURL").get(function() {
  return `${this.URLSent.mutableURL}${this._id}`;
});

const Message = (module.exports = mongoose.model("message", MessageSchema));
