# WebLEDs

A simple web-interface for controlling (turning on or off) LEDs connected
to an arduino.

**Requirements:** StandardFirmataPlus must be loaded onto the Arduino
([Guide](http://johnny-five.io/platform-support/)).

## Configuration

Edit the `.env.sample` file and set each variable to the desired value.

 - `COM_PORT`: Specifies the COM port the Arduino is connected to. E.g. `COM3`, `/dev/...`.
 - `WEB_PORT`: The port the web server should run on.
 - `LED_PORTS`: Comma-separated list of Arduino ports connected to LEDs.

## License

Licensed under the [MIT License](./LICENSE).
