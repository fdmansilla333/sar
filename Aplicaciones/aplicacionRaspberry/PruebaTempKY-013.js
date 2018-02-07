var math = require("mathjs");
var express = require('express');
var app = express();

const A = 0.001129148;
const B = 0.000234125;
const C = 0.0000000876741;

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // This requires OneWire support using the ConfigurableFirmata
  
  var sensor = new five.Sensor("A0");
  

  sensor.on("ready", function() {    
    var R = this.value;
    //var temp = A + B * math.log(R) + C * math.pow(math.log(R),3);
    //temp = 1/temp;
    console.log (R);
    var Temp = math.log(10000.0*((1024.0/R-1)));
    Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp );
    Temp = Temp - 273.15; 
    console.log(Temp + "°C");
    // console.log("0x" + this.address.toString(16));
  });
});
});

app.listen(3000, function () {
  console.log('Conectate al puerto 3000!');
});
