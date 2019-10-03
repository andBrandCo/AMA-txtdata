const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendRequestToTwilio = (to, message) =>
  client.messages
    .create({
      //   body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      body: message,
      from: `${process.env.TWILIO_PHONE_NUMBER}`,
      to
      //   to: "+15558675310"
    })
    .then(message => console.log("twilio response - ", message.sid));

const testClient = require("twilio")(
  process.env.TEST_TWILIO_ACCOUNT_SID,
  process.env.TEST_TWILIO_AUTH_TOKEN
);

exports.testSendRequestToTwilio = (to, message) => {
  console.log("test twilio fh start");
  console.log("to, message = ", to, message);
  console.log("test twilio SID - ", process.env.TEST_TWILIO_ACCOUNT_SID);
  console.log("test twilio TOken - ", process.env.TEST_TWILIO_AUTH_TOKEN);
  console.log("test twilio phone number - ", process.env.TWILIO_PHONE_NUMBER);

  return testClient.messages
    .create({
      //   body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      body: message,
      from: "+15005550006",
      to
      //   to: "+15558675310"
    })
    .then(message => console.log("twilio response - ", message));
};
