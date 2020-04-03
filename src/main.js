require('dotenv').config();

const path = require('path');
const five = require('johnny-five');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const ratelimit = require('express-rate-limit');
const { notFound, errorHandler } = require('./middleware');

const { COM_PORT, WEB_PORT, LED_PORTS } = process.env;
const ledPorts = LED_PORTS.split(',')
	.map(p => p.trim())
	.sort((a, b) => a - b);

const board = new five.Board({
	port: COM_PORT,
	repl: false,
});
const leds = Object.fromEntries(ledPorts.map(p => [p, null]));

function setLED(port, state) {
	const portNum = parseInt(port, 10);
	if (leds[port] === null) {
		leds[port] = new five.Led(portNum);
	}

	if (state) {
		leds[port].on();
	} else {
		leds[port].off();
	}
}

board.on('ready', () => {
	for (const port of ledPorts) {
		setLED(port, false);
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
		const { leds: ledStates } = req.body;
		for (const [port, state] of Object.entries(ledStates)) {
			setLED(port, state);
		}

		res.sendStatus(201);
	} else {
		res.status(503);
	}
});

app.get('/', (req, res) => {
	res.render(path.join(__dirname, '..', 'public', 'index.ejs'), { ports: ledPorts });
});

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use(notFound);
app.use(errorHandler);

app.listen(WEB_PORT, () => {
	console.log(`Webserver running on port ${WEB_PORT}...`);
});
