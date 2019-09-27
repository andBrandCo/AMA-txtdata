const Message = require("../models/message");
const { bitlyRequest } = require("../tools/bitly");
const { mutableURLTemplate } = require("../models/const");

const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);
const createNewMessage = async data => {
  const message = new Message({
    keyword: data
  });
  const { link } = await bitlyRequest(`${mutableURLTemplate}${message._id}`);
  message.URLSent = {
    mutableURL: mutableURLTemplate,
    shortURL: link
  };
  console.log("new message - ", message);
  await message.save();
  return message;
};

const updateRow = async ({
  params: { id },
  body: { autoResponseAfterURL, autoResponseBeforeURL, mutableURL, keyword }
}) => {
  const { URLSent } = await Message.findById(id);
  let newShortLink = "";
  if (URLSent.mutableURL !== mutableURL) {
    newShortLink = await bitlyRequest(`${mutableURL}${id}`);
  }

  return Message.findByIdAndUpdate(
    id,
    {
      $set: {
        "URLSent.mutableURL": mutableURL,
        "URLSent.shortURL": newShortLink.link
          ? newShortLink.link
          : URLSent.shortURL
      },
      autoResponseAfterURL,
      autoResponseBeforeURL,
      keyword
    },
    { new: true }
  );
};

const deleteRow = ({ params: { id } }) => {
  return Message.findByIdAndDelete(id);
};

const createRow = async ({
  body: { keyword, autoResponseBeforeURL, autoResponseAfterURL, mutableURL }
}) => {
  const message = new Message({
    keyword,
    autoResponseBeforeURL,
    autoResponseAfterURL
  });
  const { link } = await bitlyRequest(`${mutableURL}${message._id}`);
  message.URLSent = {
    mutableURL,
    shortURL: link
  };
  console.log("new message - ", message);
  await message.save();
  return message;

  // const { link } = await bitlyRequest(mutable);

  // return Message.create({
  //   keyword,
  //   autoResponseBeforeURL,
  //   autoResponseAfterURL,
  //   URLSent: {
  //     mutableURL: mutable,
  //     shortURL: link
  //   }
  // });
};

module.exports = {
  getAllMessageList,
  getRowByID,
  createNewMessage,
  updateRow,
  deleteRow,
  createRow
};
