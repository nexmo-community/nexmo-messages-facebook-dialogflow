# Vonage Messages API - Connect Facebook & Google Dialogflow

This sample application demonstrates how to connect a Facebook page to Google's Dialogflow (a powerful NLP engine that allows you to write and train responses to incoming questions).

This app is built using the [Koa framework](https://koajs.com/) and requires a Node.Js version of 7.6.0 or above. It uses the [Vonage Messages API](https://developer.vonage.com/messages/overview) to handle inbound and outbound messaging from Facebook.

## Prerequisites

You will need a few things to get going with this app:

- A [Vonage](https://vonage.com) Account
- A Vonage Messages & Dispatch App [[set one up here]](https://dashboard.nexmo.com/messages/create-application)
- A Facebook page for a business or brand
- A [Google Dialogflow](https://dialogflow.com) account

## Installation

To get this up and running:

- Clone the repo and run `npm install`
- Rename `.env.sample` to `.env` and fill out all the environment vars required
- Run `npm run dev` to start things up!

## Google Dialogflow Settings

For testing, you can set your app up as a Small Talk Bot that will generate chirpy responses to anything you ask it. Once you've confirmed everything is working you'll want to move to using your own Intents and Entities to make it _useful_.

For more information on getting Dialogflow up and running, check out the [Dialogflow documentation](https://dialogflow.com/docs/getting-started).
