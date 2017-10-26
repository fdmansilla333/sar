var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function () {

    /*
     * This is the simplest initialization
     * We assume SW_SERIAL0 for the port
     */
    var gps = new five.GPS({
      pins: {
        rx: 52,
        tx: 53,
      }
    });

    // If latitude, longitude change log it
    gps.on("change", function () {
      console.log("position");
      console.log("  latitude   : ", this.latitude);
      console.log("  longitude  : ", this.longitude);
      console.log("  altitude   : ", this.altitude);
      console.log("--------------------------------------");
    });
    // If speed, course change log it
    gps.on("navigation", function () {
      console.log("navigation");
      console.log("  speed   : ", this.speed);
      console.log("  course  : ", this.course);
      console.log("--------------------------------------");
    });
    console.log("Sin cambios");
  });
});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});
