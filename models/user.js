const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const validate = require("mongoose-validator");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters"
  })
  // validate({
  //   validator: 'isAlphanumeric',
  //   passIfEmpty: true,
  //   message: 'Name should contain alpha-numeric characters only',
  // }),
];

const emailValidator = [
  validate({
    validator: "isLength",
    arguments: [0, 40],
    message: "Email must not exceed {ARGS[1]} characters."
  }),
  validate({
    validator: "isEmail",
    message: "Email must be valid."
  })
];

const ageValidator = [
  // TODO: Make some validations here...
];

const genderValidator = [
  // TODO: Make some validations here...
];

// Define the database model
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required.'],
//     validate: nameValidator
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required.'],
//     unique: true,
//     validate: emailValidator
//   },
//   age: {
//     type: Number,
//     validate: ageValidator
//   },
//   gender: {
//     type: String,
//     validate: genderValidator
//   }
// });

// Use the unique validator plugin
// UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Name is required."],
      validate: nameValidator
    },
    hash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.set("toJSON", { virtuals: true });
const User = (module.exports = mongoose.model("user", UserSchema));
