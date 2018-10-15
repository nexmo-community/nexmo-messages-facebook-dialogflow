const Nexmo = require('nexmo');
const FBID = 'YOUR_FACEBOOK_PAGE_ID';
const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET,
  applicationId: NEXMO_APPLICATION_ID,
  privateKey: './private.key'
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
