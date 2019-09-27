// const request = require("request");
const axios = require("axios");

exports.bitlyRequest = url => {
  console.log("url will make short by axios req - ", url);
  const options = { long_url: url };
  return axios.post("https://api-ssl.bitly.com/v4/shorten", options, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_BITLY}`
    }
  });
};
