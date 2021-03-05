const nodemailer = require('nodemailer')
const pug = require('pug')
const { htmlToText } = require('html-to-text')
require('dotenv').config()

module.exports = class Email {
	constructor(formInfo) {
		this.name = formInfo.name
		this.email = formInfo.email
		this.desc = formInfo.desc
		this.from = `Fantastic Flames <${process.env.EMAIL_FROM}>`
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			// Sendgrid
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: process.env.SENDGRID_USERNAME,
					pass: process.env.SENDGRID_PASSWORD,
				},
			})
		}

		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		})
	}

	async send(template, subject, copy = false) {
		//render html for email based on Pug template
		const html = pug.renderFile(`${__dirname}/views/${template}.pug`, {
			name: this.name,
			email: this.email,
			desc: this.desc,
		})

		//define email options
		const mailOptions = {
			from: this.from,
			to: copy ? this.email : process.env.MASTER_EMAIL,
			subject,
			html,
			text: htmlToText(html),
		}

		//create transport and send email
		return await this.newTransport().sendMail(mailOptions)
	}

	async sendBooking() {
		return await this.send('main', 'New email from your Fantastic Flames website')
	}

	async sendCopy() {
		return await this.send('copy', 'Your email to Fantastic Flames', true)
	}
}
