const express = require('express')
// const Email = require('./email')
// const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
// app.use(cors())

app.get('/', async (req, res) => {
	const vars = {
		title: 'Home Page',
		name: 'John',
		email: 'john@hotmail.com',
		phone: '123-123-1234',
		desc:
			'Hello, this is the event description. We would like this and we would like that. Hello. Lorem ipsum etc etc etc. Hello.',
	}

	res.render('main', vars)
})

// app.post('/sendEmail', async (req, res) => {
// 	const { name, email, desc, phone, sendCopy } = req.body

// 	if (name && email && desc && phone) {
// 		const mail = new Email({ name, email, desc, phone })
// 		const sent = await mail.sendBooking()

// 		if (sendCopy) {
// 			const copy = await mail.sendCopy()
// 		}

// 		res.status(200).json({
// 			status: 'success',
// 			message: `attempted to send email with following params: ${name}, ${email}, ${desc}`,
// 		})
// 	} else {
// 		res.status(400).json({
// 			status: 'failed',
// 			message: 'Name, email, phone and desc are required fields',
// 		})
// 	}
// })

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
