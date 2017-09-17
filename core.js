/* server.js */
'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const router = express.Router();
const Botkit       = require('botkit');     // botkit

// start server
app.listen(port, function (req, res) {
    console.info(`Started Express server on port ${port}`)
});




// use the tokens you got from the previous step
const slack_token  = 'xoxp-241625504320-241625504464-241656798864-e0002b8321c9ead9f474f0d1f3e123ef';
const slack_oauth  = 'xoxb-242232208611-32h98NAnRn33gez175WZhKxg';
exports.fn = {
	/**
	 * Starts Slack-Bot
	 *
	 * @returns {*}
	 */
	slackBot() {
		// initialisation
		const slackController = Botkit.slackbot({
			// optional: wait for a confirmation events for each outgoing message before continuing to the next message in a conversation
			require_delivery: true
		});
		const slackBot = slackController.spawn({
			token: slack_token
		});
		// create rtm connection
		slackBot.startRTM((err, bot, payload) => {
			if (err) {
				throw new Error('Could not connect to Slack');
			}
			slackController.log('Slack connection established.');
		});
		// listener that handles incoming messages
		slackController.hears(['.*'], ['direct_message', 'direct_mention'], (bot, message) => {
			slackController.log('Slack message received');
			bot.reply('I have received your message!')
		});
	}
};