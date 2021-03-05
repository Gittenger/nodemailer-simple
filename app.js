const express = require('express')
const Email = require('./email')
require('dotenv').config()

const app = express()
app.set('view engine', 'pug')
app.set('views', __dirname)

app.use(express.json())

app.get('/sendEmail', async (req, res) => {
	const { name, email, desc } = req.body

	await new Email({ name, email, desc }).sendBooking()

	res.status(200).json({
		status: 'success',
		message: `attempted to send email with following params: ${name}, ${email}, ${desc}`,
	})
})

const port = process.env.PORT
app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
