var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function () {

    var temperature = new five.Thermometer({
      pin: "A0"
    });

    temperature.on("data", function () {
      console.log("celsius: %d", this.C);
      console.log("fahrenheit: %d", this.F);
      console.log("kelvin: %d", this.K);
    });
  });

});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});

