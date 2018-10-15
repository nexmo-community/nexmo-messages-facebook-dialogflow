if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = process.env.DIALOGFLOW_SESSION_ID;
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const dialogflowHandler = async query => {
  // Create a text query request object
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode
      }
    }
  };

  // Send the text query over to Dialogflow and await the result
  // using .catch to throw any errors
  const result = await sessionClient
    .detectIntent(request)
    .catch(err => console.error('ERROR:', err));

  // Pick out the response text from the returned array of objects
  const reply = await result[0].queryResult.fulfillmentText;

  // Return the reply
  return reply;
};

module.exports = dialogflowHandler;
