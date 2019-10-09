const MessagingResponse = require("twilio").twiml.MessagingResponse;


const Message = require("../models/message");
const { bitlyRequest } = require("../tools/bitly");
const { mutableURLTemplate } = require("../models/const");
// const { testSendRequestToTwilio } = require("../tools/twilio_send_sms");
const recordService = require("./recordService");
const phoneNumberService = require("./phoneNumberService");

const RecordService = new recordService();
const PhoneNumberService = new phoneNumberService();

const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);
const findByKeyword = async (keyword, mobileNumber, res) => {
  console.log(keyword)
  console.log(mobileNumber)
  console.log(res)
  const row = await Message.findOne({ keyword });
  const phoneData = await PhoneNumberService.findPhoneOrCreate({
    mobileNumber
  });
  console.log("PHHHHHOOOONE data come back - ", phoneData);

  console.log("row in service - ", row);
  if (row) {
    const {
      data: { link }
    } = await bitlyRequest(`${row.URLSent.mutableURL}${phoneData._id}`);
    console.log("SHORT link - ", link);
    const autoResponse = `${row.autoResponseBeforeURL} [ ${link} ] ${row.autoResponseAfterURL}`;
    console.log("autoRESp - ", autoResponse);
    RecordService.addRow({
      mobileNumber,
      phoneID: phoneData._id,
      autoResponse,
      urlSent: row.URLSent.wholeURL,
      keyword
    });
    const twiml = new MessagingResponse();
    console.log(autoResponse)
    //twiml.message(autoResponse);
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
    // testSendRequestToTwilio(phoneData.mobileNumber, autoResponse);
  }
  console.log("this keyword Dosnt exist!!");

  RecordService.addRow({
    keyword,
    mobileNumber,
    phoneID: phoneData._id
  });
};

const updateRow = async ({
  params: { id },
  body: { autoResponseAfterURL, autoResponseBeforeURL, mutableURL, keyword }
}) => {
  return Message.findByIdAndUpdate(
    id,
    {
      $set: {
        "URLSent.mutableURL": mutableURL
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
  console.log("mutableData - ", mutableURL);
  const url = mutableURL ? mutableURL : mutableURLTemplate;
  console.log("url for save - ", url);

  const message = new Message({
    keyword,
    autoResponseBeforeURL,
    autoResponseAfterURL,
    URLSent: {
      mutableURL: url
    }
  });
  await message.save();
  return message;
};

module.exports = {
  getAllMessageList,
  getRowByID,
  findByKeyword,
  updateRow,
  deleteRow,
  createRow
};
