const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
// const validate = require("mongoose-validator");

// Define the database model
const AllRequestSchema = new mongoose.Schema(
  {
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

const allRequest = (module.exports = mongoose.model(
  "allRequest",
  AllRequestSchema
));
