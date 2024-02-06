const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const router = express.Router();
const HttpCodes = require('../enums/http-codes');
require('dotenv/config');
const pool = require('../mysql_db');
const fs = require('fs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const CONSTANTS = require('./constants');
const { google } = require('googleapis');
const PDFGenerator = require('pdfkit');

router.post('/sendEmail', (req, res) => {
	console.log('inside share email', req.body);
	const tableTop = 270;
	const reservation_idX = 50;
	const hotel_nameX = 150;
	const addressX = 50;
	const start_dateX = 350;
	const end_dateX = 450;
	const number_of_guestsX = 150;
	const amountX = 250;
	const suiteX = 350;
	const flight_nameX = 150;
	const originX = 250;
  const destinationX = 350;
	const departureX = 50;
	const arrivalX = 200;

	const invoiceData = {
		flight_items: [
			{
				reservation_id: 12341,
				flight_name: 'Alaska Airlines',
				origin: 'San Jose',
				destination: 'New York',
				departure: '12-12-2022',
				arrival: '12-30-2022',
			},
			{
				reservation_id: 12341,
				flight_name: 'Alaska Airlines',
				origin: 'San Jose',
				destination: 'New York',
				departure: '12-12-2022',
				arrival: '12-30-2022',
			},
      {
				reservation_id: 12341,
				flight_name: 'Alaska Airlines',
				origin: 'San Jose',
				destination: 'New York',
				departure: '12-12-2022',
				arrival: '12-30-2022',
			},
		],
		hotel_items: [
			{
				reservation_id: 12341,
				hotel_name: 'Hyat',
				address: '390 Kiely Drive, San Jose, 95130',
				start_date: '12-12-2022',
				end_date: '12-30-2022',
				number_of_guests: 4,
				total_payments: 300,
			},
			{
				reservation_id: 12341,
				hotel_name: 'Hyat',
				address: '390 Kiely Drive, San Jose, 95130',
				start_date: '12-12-2022',
				end_date: '12-30-2022',
				number_of_guests: 4,
				total_payments: 300,
			},
			{
				reservation_id: 12341,
				hotel_name: 'Hyat',
				address: '390 Kiely Drive, San Jose, 95130',
				start_date: '12-12-2022',
				end_date: '12-30-2022',
				number_of_guests: 4,
				total_payments: 300,
			},
		],
	};

	const generateHeaders = (doc, name) => {
		doc.image('./logo.jpg', 0, 0, { width: 150 }).fillColor('#000').fontSize(20);

		const beginningOfPage = 50;
		const endOfPage = 550;

		doc.moveTo(beginningOfPage, 200).lineTo(endOfPage, 200).stroke();

		doc.text(name, 50, 210);

		doc.moveTo(beginningOfPage, 250).lineTo(endOfPage, 250).stroke();
	};

	// instantiate the library
	let theOutput = new PDFGenerator();

	// pipe to a writable stream which would save the result into the same directory
	theOutput.pipe(fs.createWriteStream('./files/Itinerary.pdf'));

	theOutput.fontSize(20).text('Itinerary Details', { bold: true, underline: true, align: 'center' }, 100, 100);

	generateHeaders(theOutput, 'Hotel Reservations');

	theOutput.moveDown();

	theOutput
		.fontSize(10)
		.text('Reservation ID', reservation_idX, tableTop, { underline: true })
		.text('Hotel Name', hotel_nameX, tableTop, { underline: true })
		.text('Address', addressX, tableTop +100, { underline: true })
		.text('Check In', start_dateX, tableTop, { underline: true })
		.text('Check Out', end_dateX, tableTop, { underline: true } )
		.text('Total Guests', number_of_guestsX, tableTop + 100, { underline: true })
		.text('Amount', amountX, tableTop + 100, { underline: true })
		.text('Suite Type', suiteX, tableTop + 100, { underline: true })
	for (i = 0; i < req.body.hotel_items.length; i++) {
		const item = req.body.hotel_items[i];
		const y = tableTop + 25 + i * 25;
		const y2 = tableTop + 100 + 25 + i * 25;
		theOutput
			.fontSize(10)
			.text(item.reservation_id, reservation_idX, y)
			.text(item.hotel_name, hotel_nameX, y)
			.text(item.address, addressX, y2)
			.text(new Date(item.start_date).toDateString(), start_dateX, y)
			.text(new Date(item.end_date).toDateString(), end_dateX, y)
			.text(item.number_of_guests, number_of_guestsX, y2)
			.text(`$ ${item.total_payment}`, amountX, y2)
			.text(item.suite_type, suiteX, y2);
	}

	theOutput.addPage();
	generateHeaders(theOutput, 'Flight Reservations');

	theOutput.moveDown();

	theOutput
		.fontSize(10)
		.text('Reservation ID', reservation_idX, tableTop, { underline: true })
		.text('Flight Name', flight_nameX, tableTop, { underline: true })
		.text('Origin', originX, tableTop, { underline: true })
		.text('Destination', destinationX, tableTop, { underline: true })
		.text('Departure', departureX, tableTop  +100, { underline: true })
		.text('Arrival', arrivalX, tableTop +100, { underline: true });
	for (i = 0; i < req.body.flight_items.length; i++) {
		const item = req.body.flight_items[i];
		const y = tableTop + 25 + i * 25;
		const y2 = tableTop + 100 + 25 + i * 25;
		theOutput
			.fontSize(10)
			.text(item.reservation_id, reservation_idX, y)
			.text(item.flight_name, flight_nameX, y)
			.text(item.origin, originX, y)
			.text(item.destination, destinationX, y)
			.text(new Date(item.departure).toUTCString(), departureX, y2)
			.text(new Date(item.arrival).toUTCString(), arrivalX, y2)
	}

	// write out file
	theOutput.end();

	// Adding functionality
	//doc.fontSize(27).text("This the article for GeeksforGeeks", 100, 100);
	for (i in req.body.emails) {
		sendemail(req.body.emails[i], req.body.message);
	}

	res.status(HttpCodes.OK).send({ Message: 'Succesfully sent email' });
});

const sendemail = async (email, message, req, res) => {
	const oAuth2Client = new google.auth.OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		process.env.REDIRECT_URL
	);

	oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
	const auth = {
		type: 'OAuth2',
		user: 'valpteam6.280@gmail.com',
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.REFRESH_TOKEN,
	};

	var receiverEmailId = email;

	var messages = `<p>Hello,</p>
                     <p>An user has Shared itenary from VALP web App!</p>
					 <p>message from user: ${message}<p>
                     <p>Please download attachments for more details.</p>
                     <p>Regards,<br></br>VALP Team</p></p>`;

	const mailoptions = {
		from: 'VALP &lt;valpteam6.280@gmail.com>',
		to: receiverEmailId,
		subject: 'VALP Travles: Shared Itinerary!',
		html: messages,
		attachments: {
			// file on disk as an attachment
			filename: 'iternary.pdf',
			path: './files/Itinerary.pdf', // stream this file
		},
	};

	try {
		const accessToken = await oAuth2Client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				...CONSTANTS.auth,
				accessToken: accessToken,
			},
		});
		const result = await transport.sendMail(mailoptions);
		return result;
	} catch (error) {
		return error;
	}
};

router.post('/email', async (req, res) => {
	sendemail();
});

module.exports = router;
