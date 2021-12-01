if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Vonage = require('@vonage/server-sdk');
const FBID = process.env.FACEBOOK_PAGE_ID;

// Set up your Vonage credentials
const vonage = new Vonage(
  {
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    applicationId: process.env.VONAGE_APPLICATION_ID,
    privateKey: process.env.VONAGE_PRIVATE_KEY,
  },
  {
    apiHost: `https://messages-sandbox.nexmo.com/`,
  }
);

// Export function to send messages
const messageResponder = async (message) => {
  const request = require('request');

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const vonage_sandbox_number = '107083064136738';

  const dataString = `{
    "from": { "type": "messenger", "id": "${vonage_sandbox_number}" },
    "to": { "type": "messenger", "id": "${message.id}" },
    "message": {
      "content": {
        "type": "text",
        "text": "${message.dialogflowResponse}"
      }
    }
  }`;

  const options = {
    url: 'https://messages-sandbox.nexmo.com/v0.1/messages',
    method: 'POST',
    headers: headers,
    body: dataString,
    auth: {
      user: process.env.VONAGE_API_KEY,
      pass: process.env.VONAGE_API_SECRET,
    },
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);
};

module.exports = messageResponder;
