const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = process.env.DIALOGFLOW_SESSION_ID;
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const dialogflowHandler = async query => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode
      }
    }
  };

  const result = await sessionClient
    .detectIntent(request)
    .catch(err => console.error('ERROR:', err));

  const reply = await result[0].queryResult.fulfillmentText;

  return reply;
};

module.exports = dialogflowHandler;
