const axios = require("axios");

class TextlineService {
  async getCustomerByPhoneNumber(number) {
    return await axios.get(
      `https://application.textline.com/api/customers.json?phone_number=${number}`,
      {
        headers: {
          "X-TGP-ACCESS-TOKEN": `${process.env.TEXTLINE_ACCESS_TOKEN}`
        }
      }
    );
  }

  async createCustomer(body) {
    return await axios.post(
      `https://application.textline.com/api/customers.json`,
      body,
      {
        headers: {
          "content-type": "application/json",
          "X-TGP-ACCESS-TOKEN": `${process.env.TEXTLINE_ACCESS_TOKEN}`
        }
      }
    );
  }

  async sendMessageToPhoneNumber(body) {
    return await axios.post(
      `https://application.textline.com/api/conversations.json`,
      body,
      {
        headers: {
          "content-type": "application/json",
          "X-TGP-ACCESS-TOKEN": `${process.env.TEXTLINE_ACCESS_TOKEN}`
        }
      }
    );
  }
}

module.exports = TextlineService;
