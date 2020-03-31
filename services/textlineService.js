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
  async sendIncomingMessageToPhoneNumber(body) {
    return await axios.post(
      `https://application.textline.com/api/new_customer_post.json`,
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
      //`httpstat.us/408`,
      body,
      {
        headers: {
          "content-type": "application/json",
          "X-TGP-ACCESS-TOKEN": `${process.env.TEXTLINE_ACCESS_TOKEN}`
        }
      }
    ).then(function (response) {
      console.log('rere' + response);
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

module.exports = TextlineService;
