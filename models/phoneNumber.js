const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
// const validate = require("mongoose-validator");

// Define the database model
const PhoneNumberSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      unique: true,
      required: [true, "User phone number required."]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Use the unique validator plugin
// UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

PhoneNumberSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

const PhoneNumber = (module.exports = mongoose.model(
  "phoneNumber",
  PhoneNumberSchema
));
