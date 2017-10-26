var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // This requires OneWire support using the ConfigurableFirmata
  var thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: 50
  });

  thermometer.on("change", function() {
    console.log(this.celsius + "°C");
    // console.log("0x" + this.address.toString(16));
  });
});
});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});
