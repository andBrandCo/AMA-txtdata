const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
// const validate = require("mongoose-validator");

// Define the database model
const PhoneNumberSchema = new mongoose.Schema(
  {
    mobileNumber: {
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

PhoneNumberSchema.set("toJSON", { virtuals: true });

const PhoneNumber = (module.exports = mongoose.model(
  "phoneNumber",
  PhoneNumberSchema
));
