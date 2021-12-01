if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Vonage = require('@vonage/server-sdk');
const FBID = process.env.FACEBOOK_PAGE_ID;

// Set up your Vonage credentials
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY
});

// Export function to send messages
const messageResponder = async message => {
  vonage.channel.send(
    { type: 'messenger', id: message.id },
    { type: 'messenger', id: FBID },
    {
      content: {
        type: 'text',
        text: message.dialogflowResponse
      }
    },
    (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log(
          `Replied to ${message.id} with '${message.dialogflowResponse}' (ID: ${
            data.message_uuid
          })`
        );
      }
    }
  );
};

module.exports = messageResponder;
