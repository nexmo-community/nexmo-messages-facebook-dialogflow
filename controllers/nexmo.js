if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Nexmo = require('nexmo');
const FBID = process.env.FACEBOOK_PAGE_ID;

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APPLICATION_ID,
  privateKey: process.env.NEXMO_PRIVATE_KEY
});

const messageResponder = async message => {
  nexmo.channel.send(
    { type: 'messenger', id: message.id },
    { type: 'messenger', id: FBID },
    {
      content: {
        type: 'text',
        text: message.dialogflowResponse
      }
    },
    (err, data) => {
      console.log(data.message_uuid);
    }
  );
};

module.exports = messageResponder;
