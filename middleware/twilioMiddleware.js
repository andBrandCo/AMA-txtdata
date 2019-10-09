const { authMiddleware } = require("./authMiddleware");

exports.twilioMiddleware = async function(req, res, next) {
  try {
    console.log("TWILIO HEADERS - ", req.headers);

    // const { origin, referer, host } = req.headers;
    // console.log("path, full Path - ", origin, referer, host);
    if (
      //   origin === process.env.TWILIO_SERVICE_URL ||
      //   referer === process.env.TWILIO_SERVICE_URL ||
      //   host === process.env.TWILIO_HOST
      true
    ) {
      return next();
    }
  } catch (err) {
    console.log("catch block worked!");
    console.log("err- ", err);

    return res.status(400).send(err.message);
  }
  console.log("usual case when it is not Twilio");
  return authMiddleware(req, res, next);
  //   res.status(400).send("Bad request! I don't know you");
};
