# WebLEDs

A simple web-interface for controlling (turning on or off) LEDs connected
to an arduino.

## Installation & Execution

**Requirements:**
 - [Node.js](https://nodejs.org/en/).
 - [Arduino with StandardFirmataPlus](http://johnny-five.io/platform-support/).

Run `npm install` in the project folder to install all dependencies, then `node .` will
run the webserver and connect to the Arduino.

## Configuration

Edit the `.env.sample` file and set each variable to the desired value, then rename it to
`.env`.

 - `COM_PORT`: Specifies the COM port the Arduino is connected to. E.g. `COM3`, `/dev/...`.
 - `WEB_PORT`: The port the web server should run on.
 - `LED_PORTS`: Comma-separated list of Arduino ports connected to LEDs.

## License

Licensed under the [MIT License](./LICENSE).
