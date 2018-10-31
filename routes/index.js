const dialogflowHandler = require('../controllers/dialogflow');
const messageResponder = require('../controllers/nexmo');

const routes = {
  inbound: async ctx => {
    // Get the detail of who sent the message, and the message itself
    const { from, message, direction, timestamp } = await ctx.request.body;

    // Log initial interaction from Facebook.
    console.log(
      `New ${direction} message from ${from.id}. Content: "${
        message.content.text
      }" at ${timestamp}`
    );

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
    console.log(
      `Received status update for ${status.message_uuid}: ${status.status}`
    );
    ctx.status = 200;
  }
};

module.exports = routes;
