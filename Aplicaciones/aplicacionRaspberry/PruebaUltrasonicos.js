var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function () {
    //Se enciende la placa
    var proximity1 = new five.Proximity({
      controller: "HCSR04",
      pin: 22
    });

    var proximity2 = new five.Proximity({
      controller: "HCSR04",
      pin: 24
    });
    var proximity3 = new five.Proximity({
      controller: "HCSR04",
      pin: 26
    });

    proximity1.on("change", function () {
      console.log("Sensor centro(1) cm  : ", this.cm);
    });

    proximity2.on("change", function () {
      console.log("Sensor derecho(2) cm  : ", this.cm);
    });

    proximity3.on("change", function () {
      console.log("Sensor izquierdo(3) cm  : ", this.cm);
    });
    /*
    proximity.on("change", function() {
      console.log("The obstruction has moved.");
    });*/

  }); //Fin de ready
});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});
