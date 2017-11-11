var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

  var five = require("johnny-five");
  //var mega = new five.Board({ port: "COM3" });
  //var nano = new five.Board({ port: "COM10" });
  var ports = [{ id: "mega", port: "COM3" },
  { id: "nano", port: "COM10" }
  ];

  new five.Boards(ports).on("ready", function () {
    var thermometer = new five.Thermometer({
      controller: "DS18B20",
      pin: 2,
      board: this.byId("nano")
    });

    thermometer.on("change", function () {
      console.log(this.celsius + "°C");
      // console.log("0x" + this.address.toString(16));
    });

    var proximity1 = new five.Proximity({
      controller: "HCSR04",
      pin: 22,
      board: this.byId("mega")
    });

    proximity1.on("change", function () {
      console.log("Sensor centro cm  : ", this.cm);
    });

    var sensor = new five.Sensor({
      pin: "A0",
      board: this.byId("mega")
    });

    sensor.on("change", function (value) {
      console.log("Sensor : ", value);
    });

  });

});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});
