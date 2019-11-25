const MessagingResponse = require("twilio").twiml.MessagingResponse;

const Message = require("../models/message");
const TextlineService = require("../services/textlineService");
const { bitlyRequest } = require("../tools/bitly");
const { mutableURLTemplate } = require("../models/const");
const recordService = require("./recordService");
// const phoneNumberService = require("./phoneNumberService");

const RecordService = new recordService();
// const PhoneNumberService = new phoneNumberService();
const textlineService = new TextlineService();

const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);
const findByKeyword = async (keyword, mobileNumber, res) => {
  keyword = keyword.replace(/\s+/g, "");

  const row = await Message.findOne({ keyword });
  let { data } = await textlineService.getCustomerByPhoneNumber(mobileNumber);
  // const phoneData = await PhoneNumberService.findPhoneOrCreate({
  //   mobileNumber
  // });

  // console.log("PHHHHHOOOONE data come back - ", phoneData);
  console.log("textline response data- ", data);
  if (data.customer === null) {
    const body = {
      customer: {
        phone_number: mobileNumber
        // "email": "chuck@mycompany.com",
        // "name": "Chuck Finley",
      }
    };
    const newCustomer = await textlineService.createCustomer(body);
    data = newCustomer.data;
  }

  console.log("row in service - ", row);
  if (row) {
    if (row.URLSent.mutableURL) {
      const rowAddedData = await RecordService.addRow({
        mobileNumber,
        keyword,
        uid: data.customer.uuid,
        // phoneID: "",
        autoResponse: "",
        urlSent: ""
      });

      const {
        data: { link }
      } = await bitlyRequest(`${row.URLSent.mutableURL}${rowAddedData._id}`);
      const wholeURL = `${row.URLSent.mutableURL}${rowAddedData._id}`;
      console.log("SHORT link - ", link);
      const autoResponse = `${row.autoResponseBeforeURL} ${link} ${row.autoResponseAfterURL}`;
      console.log("autoRESp - ", autoResponse);

      RecordService.updateRow(rowAddedData._id, {
        mobileNumber,
        // phoneID: phoneData._id,
        autoResponse,
        urlSent: wholeURL,
        keyword
      });
      const body = {
        phone_number: data.customer.phone_number,
        group_uuid: "7ca06e6e-44ad-4438-9074-05e6fc125544",
        comment: {
          body: autoResponse
        }
      };
      const messageResponse = await textlineService.sendMessageToPhoneNumber(
        body
      );
      console.log("Message res data from Textline - ", messageResponse.data);

      // const twiml = new MessagingResponse();
      // twiml.message(autoResponse);
      // res.writeHead(200, { "Content-Type": "text/xml" });
      // res.end(twiml.toString());
    } else {
      const autoResponseNolink = `${row.autoResponseBeforeURL} ${row.autoResponseAfterURL}`;

      console.log("autoNoLinkRESp - ", autoResponseNolink);
      RecordService.addRow({
        mobileNumber,
        uid: data.customer.uuid,
        // phoneID: phoneData._id,
        autoResponse: autoResponseNolink,
        urlSent: "",
        keyword
      });

      const messageResponse = await textlineService.sendMessageToPhoneNumber(
        body
      );
      console.log(
        "Res data from Textline withOut URL - ",
        messageResponse.data
      );
      // const twiml = new MessagingResponse();
      // twiml.message(autoResponseNolink);
      // res.writeHead(200, { "Content-Type": "text/xml" });
      // res.end(twiml.toString());
    }
  } else {
    const twiml = new MessagingResponse();
    const autoResponse = "";
    console.log("this keyword Dosnt exist!!");

    RecordService.addRow({
      keyword,
      mobileNumber,
      uid: data.customer.uuid
      // phoneID: phoneData._id
    });
    twiml.message(autoResponse);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
    console.log(twiml);
  }
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
