var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arranca el SAR');

  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function () {
    //Se enciende la placa
    var motor1;
    var motor2;
    var motor3;
    var motor4;
    /*
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
    */
    motor1 = new five.Motor({
      pins: {
        pwm: 10,
        dir: 7,
        cdir: 6,
      }
    });

    motor2 = new five.Motor({
      pins: {
        pwm: 11,
        dir: 8,
        cdir: 9,
      }
    });

    motor3 = new five.Motor({
      pins: {
        pwm: 13,
        dir: 5,
        cdir: 4,
      }
    });

    motor4 = new five.Motor({
      pins: {
        pwm: 12,
        dir: 2,
        cdir: 3,
      }
    });


    motor1.forward(255);
    motor2.forward(255);
    motor3.forward(255);
    motor4.forward(255);  
    
    board.wait(2000, function () {
      console.log('Fin forward');
      motor1.stop();
      motor2.stop();
      motor3.stop();
      motor4.stop();
      
    });

    board.wait(5000, function () {
      console.log('Reversa');
      motor1.reverse(255);
      motor2.reverse(255);
      motor3.reverse(255);
      motor4.reverse(255);
    });

    board.wait(6000, function () {
      console.log('stop');
      motor1.stop();
      motor2.stop();
      motor3.stop();
      motor4.stop();
    });


  }); //Fin de ready
});

app.listen(3000, function () {
  console.log('Pone el puerto 3000!');
});
