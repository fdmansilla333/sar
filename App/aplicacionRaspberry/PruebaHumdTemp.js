var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function () {
    //Se enciende la placa
    var sensor = new five.Sensor.Digital(30);

    sensor.on("change", function () {
      console.log("Sensor : ", this.value);
    });

  }); //Fin de ready
});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});
