if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Vonage } = require("@vonage/server-sdk");
const { MessengerText } = require("@vonage/messages");

// Set up your Vonage credentials
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY
});

// Export function to send messages
const messageResponder = async (message) => {

  vonage.messages.send(
    new MessengerText({
      text: message.dialogflowResponse,
      to: $FB_RECIPIENT_ID, // Who the message comes from. The PSID of the user you want to reply to. The FB_RECIPIENT_ID is the PSID of the Facebook User you are messaging. This value is the from.id value you received in the inbound messenger event on your Inbound Message Webhook URL.
      from: process.env.FACEBOOK_PAGE_ID,
    }),
    (err, data) => {
      if (err) {
        console.log(
          `Replied to ${message.id} with '${message.dialogflowResponse}' (ID: ${data.message_uuid})`
        );
        throw new Error(err);
      } else {
        console.log(
          `Replied to ${message.id} with '${message.dialogflowResponse}' (ID: ${data.message_uuid})`
        );
      }
    }
  );
};

module.exports = messageResponder;
