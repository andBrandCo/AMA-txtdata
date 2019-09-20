const Message = require("../models/message");
const fnHelper = require("../tools/fnHelper");
const { immutableURL, mutableURL } = require("../models/const");

const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);
const createNewMessage = async data => {
  const message = new Message({
    keyword: data
  });

  console.log("new messageID - ", message.id);
  // await message.save();

  message.URLSent = {
    immutableURL,
    mutableURL,
    wholeURL: fnHelper.createURLFromParts(immutableURL, mutableURL, message.id)
  };

  await message.save();

  console.log("new message - ", message);
  return message;
};
const setAutoResponse = ({ _id, autoResponse }) => {
  return Message.findByIdAndUpdate(
    _id,
    { autoResponse },
    { useFindAndModify: false }
  );
};

const updateURLSent = async ({
  firstField,
  secondField,
  thirdField,
  _id: id
}) => {
  return Message.findByIdAndUpdate(
    id,
    { $set: { "URLSent.mutableURL": [firstField, secondField, thirdField] } },
    { useFindAndModify: false, new: true }
  );
};

module.exports = {
  getAllMessageList,
  getRowByID,
  createNewMessage,
  setAutoResponse,
  updateURLSent
};
