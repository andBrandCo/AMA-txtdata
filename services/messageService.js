const Message = require("../models/message");

const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);
const createNewMessage = data => {
  const message = new Message({
    keyword: data
  });
  message.save();
  return message;
};
const setAutoResponse = ({ _id, autoResponse }) => {
  return Message.findByIdAndUpdate(
    _id,
    { autoResponse },
    { useFindAndModify: false }
  );
};

module.exports = {
  getAllMessageList,
  getRowByID,
  createNewMessage,
  setAutoResponse
};
