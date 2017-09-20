var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');

  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function () {
    //Se enciende la placa
    var led = new five.Led(13);
    led.blink(1000);
    var motor1;
    var motor2;

    var proximity = new five.Proximity({
      controller: "HCSR04",
      pin: 22
    });

    
    proximity.on("data", function() {
      console.log("  cm  : ", this.cm);
    });
  
    
    proximity.on("change", function() {
      console.log("The obstruction has moved.");
    });
    
    motor1 = new five.Motor({
      pins: {
        pwm: 10,
        dir: 7,
        cdir: 6,
      }
    });
    
        motor2 = new five.Motor({
          pins: {
            pwm:11,
            dir:8,
            cdir:9,
          }
        });
        

    motor1.forward(255);
     motor2.forward(255);
    board.wait(2000, function () {
      motor1.reverse(255);
      console.log('Reversa');
      motor2.reverse(255);
      board.wait(2000, function () {
        motor1.stop();
        console.log('stop');
        motor2.stop();
      });
    });


  }); //Fin de ready
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
