const dialogflowHandler = require('../controllers/dialogflow');
const messageResponder = require('../controllers/nexmo');

const routes = {
  inbound: async ctx => {
    // Get the detail of who sent the message, and the message itself
    const { from, message } = ctx.request.body;
    const dialogflowResponse = await dialogflowHandler(message.content.text);
    messageResponder({ ...from, dialogflowResponse });
    ctx.status = 200;
  },
  status: async ctx => {
    const status = await ctx.request.body;
    console.log(status);
    ctx.status = 200;
  }
};

module.exports = routes;
