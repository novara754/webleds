const leds = Array.from(document.querySelectorAll('.led-button'))
	.map(b => b.querySelector('input[type="checkbox"]'));

async function submit() {
	const ledStates = {};
	for (const led of leds) {
		ledStates[led.name] = led.checked;
	}
	postLEDs(ledStates).catch(console.error);
}

function postLEDs(ledStates) {
	return fetch('/api/led', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			leds: ledStates,
		}),
	});
}
