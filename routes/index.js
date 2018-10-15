const dialogflowHandler = require('../controllers/dialogflow');
const messageResponder = require('../controllers/nexmo');

const routes = {
  inbound: async ctx => {
    // Get the detail of who sent the message, and the message itself
    const { from, message } = await ctx.request.body;

    // Log initial interaction from Facebook. You can uncomment this for testing.
    //console.log(from, message);

    // Pass the message to Dialogflow and await the response
    const dialogflowResponse = await dialogflowHandler(message.content.text);

    // Send the Dialogflow response back to the user
    messageResponder({ ...from, dialogflowResponse });

    // All is OK
    ctx.status = 200;
  },
  status: async ctx => {
    // The status endpoint isn't actually used in this application but it is
    // good to have as a debugger because it allows you to see the message flow
    const status = await ctx.request.body;
    console.log(status);
    ctx.status = 200;
  }
};

module.exports = routes;
