/* eslint-disable */
import React, { PureComponent } from "react";
import  ChatBot  from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import bot from "../Common/bot.jpg";
const steps = [
	{
		id: '0',
		message: 'Hi APYY Fitness user!',

		// This calls the next id
		// i.e. id 1 in this case
		trigger: '1',
	}, {
		id: '1',

		// This message appears in
		// the bot chat bubble
		message: 'Please write your name',
		trigger: '2'
	}, {
		id: '2',

		// Here we want the user
		// to enter input
		user: true,
		trigger: '3',
	}, {
		id: '3',
		message: " hi {previousValue}, how can I help you?",
		trigger: 4
	}, {
		id: '4',
		user: true,
		trigger: 5
	},
	{
		id: '5',
		message: " Your query has been recorded. Our agent will contact you within 24hrs!",
		end: true
	}
];

// Creating our own theme
const theme = {
	background: 'white',
	headerBgColor: '#ee7724',
	headerFontSize: '20px',
	botBubbleColor: '#ee7724',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
};

// Set some properties of the bot
const config = {
	botAvatar: bot,
	floating: true,
};

export default function ChatBox()  {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<ChatBot

					// This appears as the header
					// text for the chat bot
					headerTitle="APYY Fitness"
					steps={steps}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
}
