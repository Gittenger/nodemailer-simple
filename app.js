const express = require('express')
const Email = require('./email')
require('dotenv').config()

const app = express()
app.set('view engine', 'pug')
app.set('views', __dirname)

app.use(express.json())

app.get('/sendEmail', async (req, res) => {
	const { name, email, desc, sendCopy } = req.body

	if (name && email && desc) {
		const mail = new Email({ name, email, desc })
		const sent = await mail.sendBooking()

		if (sendCopy) {
			const copy = await mail.sendCopy()
		}

		res.status(200).json({
			status: 'success',
			message: `attempted to send email with following params: ${name}, ${email}, ${desc}`,
		})
	} else {
		res.status(400).json({
			status: 'failed',
			message: 'Name, email, and desc are required fields',
		})
	}
})

const port = process.env.PORT
app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
