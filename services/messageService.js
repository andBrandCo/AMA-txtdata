const MessagingResponse = require("twilio").twiml.MessagingResponse;

const Message = require("../models/message");
const TextlineService = require("../services/textlineService");
const { bitlyRequest } = require("../tools/bitly");
const { mutableURLTemplate } = require("../models/const");
const recordService = require("./recordService");
//const twiml = new MessagingResponse();
const emptyResponseTwilio = ' ';
const phoneNumberService = require("./phoneNumberService");

const RecordService = new recordService();
const PhoneNumberService = new phoneNumberService();
TEXTLINE_GUID = process.env.TEXTLINE_GROUP_UID;
const textlineService = new TextlineService();
let isDefaultKeyword = false;
//let customerIsReachable;

const getAllMessageList = () => Message.find({});
const getRowByID = id => Message.findById(id);

const findByKeyword = async (keyword, mobileNumber, res) => {


  
  prettyKeyword = keyword;
  keyword = keyword.replace(/\s+/g, "");
  const defualtKeywordTextlineOverride = ['stop','unsubscribe','cancel','start','stopall'];
  
  if(defualtKeywordTextlineOverride.find(k => k==keyword.toLowerCase())){
    
    //console.log('hello');
    //console.log(defualtKeywordTextlineOverride.find(k => k==keyword.toLowerCase()));
    isDefaultKeyword = true;
    // if(keyword.toLowerCase() === "start"){
    //   customerIsReachable = true;
    // } else {
    //   customerIsReachable  = false;

    // }
    
  }

  

  const row = await Message.findOne({ keyword });
  let { data } = await textlineService.getCustomerByPhoneNumber(mobileNumber);
  const phoneData = await PhoneNumberService.findPhoneOrCreate({
    mobileNumber
  });

  console.log("PHHHHHOOOONE data come back - ", phoneData);
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

  console.log("textline response customer data", data.customer.uuid);

  //console.log(data.customer.uuid);

  // const messageIncoming = await textlineService.sendMessageToPhoneNumber(
  //   body

  // );

  //console.log(prettyKeyword);

  //console.log("row in service - ", row);
  if (row) {
    const primaryReport = typeof row.isPrimaryReport !== 'undefined'?row.isPrimaryReport:true;
    
    if (row.URLSent.mutableURL) {
      const bodyIncoming = {
        phone_number: data.customer.phone_number,
        group_uuid: TEXTLINE_GUID,
        comment: {
          body: prettyKeyword
        }
  
      };
      //console.log(row);
      const  messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
        bodyIncoming
      );
      //console.log("Message Incoming res data from Textline - ", messageIncoming.data);
      const rowAddedData = await RecordService.addRow({
        mobileNumber,
        keyword,
        //uid: row._id,
        phoneID: phoneData._id,
        autoResponse: "",
        urlSent: "",
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
        phoneID: phoneData._id,
        autoResponse,
        urlSent: wholeURL,
        keyword,
        isPrimaryReport:primaryReport,
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
      //console.log("Message res data from Textline - ", messageResponse);

      const twiml = new MessagingResponse();
      //twiml.message(emptyResponseTwilio);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    } else if(isDefaultKeyword)  {

      let prettyKeywordWithAstrik = prettyKeyword + "*";
      console.log(prettyKeywordWithAstrik);
  
    
      //console.log(row);
      // const  messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
      //   bodyIncoming
      // );
      //console.log("Message Incoming res data from Textline - ", messageIncoming.data);

      const autoResponseNolink = `${row.autoResponseBeforeURL} ${row.autoResponseAfterURL}`;

      //console.log("autoNoLinkRESp - ", autoResponseNolink);
      RecordService.addRow({
        mobileNumber,
        //uid: row._id,
        phoneID: phoneData._id,
        autoResponse: autoResponseNolink,
        urlSent: "",
        keyword,
        isPrimaryReport:primaryReport,
      });

      const body = {
        phone_number: data.customer.phone_number,
        group_uuid: TEXTLINE_GUID,
        whisper: {
          body: autoResponseNolink
        }
      };

      console.log(autoResponseNolink);
      
      const twiml = new MessagingResponse();
      twiml.message(autoResponseNolink);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());

      const bodyIncomingDefault = {
        phone_number: data.customer.phone_number,
        group_uuid: TEXTLINE_GUID,
        comment: {
          body:  "***" + prettyKeyword + "***",
        }
  
      };

      // updateCustomer = await textlineService.updateCustomer(
      //   uuid,
      //   body
      // );

      messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
        bodyIncomingDefault
      );

      messageResponse = await textlineService.sendMessageToPhoneNumber(
        body
      );
  

    } else {
      const bodyIncoming = {
        phone_number: data.customer.phone_number,
        group_uuid: TEXTLINE_GUID,
        comment: {
          body: prettyKeyword
        }
  
      };
      
    
      const  messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
        bodyIncoming
      );
      //console.log("Message Incoming res data from Textline - ", messageIncoming.data);
      const autoResponseNolink = `${row.autoResponseBeforeURL} ${row.autoResponseAfterURL}`;


      //console.log("autoNoLinkRESp - ", autoResponseNolink);
      RecordService.addRow({
        mobileNumber,
        uid: row._id,
        phoneID: phoneData._id,
        autoResponse: autoResponseNolink,
        urlSent: "",
        keyword,
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
      // console.log(
      //   "Res data from Textline withOut URL - ",
      //   messageResponse.data
      // );
      const twiml = new MessagingResponse();
      
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
    messageIncoming = await textlineService.sendIncomingMessageToPhoneNumber(
      body
    );
    //console.log("Message Incoming res data from Textline - ", messageIncoming.data);
    //console.log("this keyword Dosnt exist!!");

    RecordService.addRow({
      keyword: prettyKeyword,
      mobileNumber,
      //uid: row._id,
      phoneID: phoneData._id,
    });
      const twiml = new MessagingResponse();
      //twiml.message(emptyResponseTwilio);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    
  }
};

const updateRow = async ({
  params: { id },
  body: { autoResponseAfterURL, autoResponseBeforeURL, mutableURL, keyword, isPrimaryReport }

}) => {
  return Message.findByIdAndUpdate(
    id,
    {
      $set: {
        "URLSent.mutableURL": mutableURL
      },
      autoResponseAfterURL,
      autoResponseBeforeURL,
      keyword,
      isPrimaryReport,
    },
    { new: true }
  );
};

const deleteRow = ({ params: { id } }) => {
  return Message.findByIdAndDelete(id);
};

const createRow = async ({
  body: { keyword, autoResponseBeforeURL, autoResponseAfterURL, mutableURL, isPrimaryReport }
}) => {
  //console.log("mutableData - ", mutableURL);
  const url = mutableURL ? mutableURL : mutableURLTemplate;
  //console.log("url for save - ", url);

  const message = new Message({
    keyword,
    autoResponseBeforeURL,
    autoResponseAfterURL,
    isPrimaryReport,
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
