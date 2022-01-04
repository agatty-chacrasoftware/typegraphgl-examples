const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function sendEmail() {
	const msg = {
		to: "ashgatty888@gmail.com", // Change to your recipient
		from: "ashwini.gatty@chacrasoftware.com", // Change to your verified sender
		subject: "Sending with SendGrid is Fun",
		text: "and easy to do anywhere, even with Node.js",
		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
	};

	sgMail
		.send(msg)
		.then(() => console.log("send mail success"))
		.catch(console.log);
}

sendEmail();
