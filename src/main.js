require('dotenv').config();

const path = require('path');
const five = require('johnny-five');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const ratelimit = require('express-rate-limit');
const { notFound, errorHandler } = require('./middleware');

const { COM_PORT, WEB_PORT, LED_PINS } = process.env;

const board = new five.Board({
	port: COM_PORT,
	repl: false,
});
const leds = [];

function initLEDs() {
	if (leds.length === 0) {
		for (const port of LED_PINS.split(',')) {
			leds.push(new five.Led(parseInt(port, 10)));
		}
	}
}

board.on('ready', () => {
	initLEDs();

	for (const led of leds) {
		led.off();
	}
});

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());
app.use('/api', ratelimit({
	windowMs: 3000,
	max: 1,
}));

app.post('/api/led', (req, res) => {
	if (board.isReady) {
		initLEDs();

		const { leds: ledStates } = req.body;
		for (const led of leds) {
			if (ledStates[led.pin.toString()]) {
				led.on();
			} else {
				led.off();
			}
		}

		res.sendStatus(201);
	} else {
		res.status(503);
	}
});

app.get('/', (req, res) => {
	res.render(path.join(__dirname, '..', 'public', 'index.ejs'), { ports: leds.map(l => l.pin) });
});

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use(notFound);
app.use(errorHandler);

app.listen(WEB_PORT, () => {
	console.log(`Webserver running on port ${WEB_PORT}...`);
});
