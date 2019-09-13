const Message = require("../models/message");

const getAllMessageList = () => Message.find({});
const createNewMessage = data => {
  Message.create({ keyword: data }).then(elem => {
    console.log("created message - ", elem);

    return elem;
  });
};

module.exports = {
  getAllMessageList,
  createNewMessage
};
