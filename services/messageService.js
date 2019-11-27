const MessagingResponse = require("twilio").twiml.MessagingResponse;

const Message = require("../models/message");
const TextlineService = require("../services/textlineService");
const { bitlyRequest } = require("../tools/bitly");
const { mutableURLTemplate } = require("../models/const");
const recordService = require("./recordService");
const twiml = new MessagingResponse();
const emptyResponseTwilio = '';
// const phoneNumberService = require("./phoneNumberService");

const RecordService = new recordService();
// const PhoneNumberService = new phoneNumberService();
TEXTLINE_GUID = process.env.TEXTLINE_GROUP_UID;
const textlineService = new TextlineService();


const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);
//console.log(keyword);
const findByKeyword = async (keyword, mobileNumber, res) => {
  console.log(keyword);
  
  prettyKeyword = keyword;
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
  
  // const messageIncoming = await textlineService.sendMessageToPhoneNumber(
  //   body

  // );

  console.log(prettyKeyword);

  console.log("row in service - ", row);
  if (row) {
    const body = {
      phone_number: data.customer.phone_number,
      group_uuid: TEXTLINE_GUID,
      comment: {
        body: prettyKeyword
      }
    };
    const  messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
      body
    );
    console.log("Message Incoming res data from Textline - ", messageIncoming.data);
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
        group_uuid: TEXTLINE_GUID,
        comment: {
          body: autoResponse
        }
      };
      const messageResponse = await textlineService.sendMessageToPhoneNumber(
        body
      );
      //console.log("Message res data from Textline - ", messageResponse.data);

      //twiml.message(emptyResponseTwilio);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
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

      const body = {
        phone_number: data.customer.phone_number,
        group_uuid: TEXTLINE_GUID,
        comment: {
          body: autoResponseNolink
        }
      };

      const messageResponse = await textlineService.sendMessageToPhoneNumber(
        body
      );
      console.log(
        "Res data from Textline withOut URL - ",
        messageResponse.data
      );
      
      
      //twiml.message(emptyResponseTwilio);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    }
  } else {
    const body = {
      phone_number: data.customer.phone_number,
      group_uuid: TEXTLINE_GUID,
      comment: {
        body: prettyKeyword
      }
    };
    const  messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
      body
    );
    console.log("Message Incoming res data from Textline - ", messageIncoming.data);
    console.log("this keyword Dosnt exist!!");

    RecordService.addRow({
      keyword: prettyKeyword,
      mobileNumber,
      uid: data.customer.uuid
      // phoneID: phoneData._id
    });
    //twiml.message(emptyResponseTwilio);
    //console.log(res.end(twiml.toString()));
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
    
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
