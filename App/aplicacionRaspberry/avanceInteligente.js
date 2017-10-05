// En este script se genera un avance indefinido de los motores, los mismos se frenan 
//al detectar el sensor ulatrasónico un objeto a 10 o menos centimetros (Puerto de escucha:3000)
var express = require('express');
var app = express();
var path = require("path");

global.five = require("johnny-five");
global.board = new five.Board();

//avance con stop
app.get('/', function (req, res) {
    res.send('Arranca el SAR');

    var five = require("johnny-five");
    var board = new five.Board();
    var cont = 0;

    board.on("ready", function () {
        //Se enciende la placa
        var motor1;
        var motor2;
        var motor3;
        var motor4;

        //Configuro el sensor de proximidad en el pin 22
        var proximity = new five.Proximity({
            controller: "HCSR04",
            pin: 22
        });

        // Configuración de motores
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

        console.log("ready");
        //Avance por defecto de los 4 motores
        motor1.forward(255);
        motor2.forward(255);
        motor3.forward(255);
        motor4.forward(255);

        // Si se generan modificaciones en la distancia de objetos, paran o avanzan los motores
        proximity.on("change", function () {
            // console.log("Entro a change", cont);
            proximity.on("data", function () {
                //console.log("  cm  : ", this.cm);
                // console.log("Entro a data");
            });
            cont++;

            if (proximity.cm <= 20) {
                //console.log('Paro: ', proximity.cm);
                motor1.stop();
                motor2.stop();
                motor3.stop();
                motor4.stop();
            }
            else {
                //console.log('Avance:', proximity.cm);
                motor1.forward(255);
                motor2.forward(255);
                motor3.forward(255);
                motor4.forward(255);
            }
        });
    }); //Fin de ready
});

app.get('/index', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/avanzar', function (req, res) {

    global.board.on("ready", function () {
        //Se enciende la placa
        var motor1;
        var motor2;
        var motor3;
        var motor4;

        //Configuro el sensor de proximidad en el pin 22
        var proximity = new global.five.Proximity({
            controller: "HCSR04",
            pin: 22
        });

        // Configuración de motores
        motor1 = new global.five.Motor({
            pins: {
                pwm: 10,
                dir: 7,
                cdir: 6,
            }
        });

        motor2 = new global.five.Motor({
            pins: {
                pwm: 11,
                dir: 8,
                cdir: 9,
            }
        });

        motor3 = new global.five.Motor({
            pins: {
                pwm: 13,
                dir: 5,
                cdir: 4,
            }
        });

        motor4 = new global.five.Motor({
            pins: {
                pwm: 12,
                dir: 2,
                cdir: 3,
            }
        });

        console.log("ready");
        //Avance por defecto de los 4 motores
        motor1.forward(255);
        motor2.forward(255);
        motor3.forward(255);
        motor4.forward(255);

    }
    )
}
)


app.get('/stop', function (req, res) {
    //var five = require("johnny-five");
    //var board = new five.Board();

    global.board.on("ready", function () {
        //Se enciende la placa
        var motor1;
        var motor2;
        var motor3;
        var motor4;

        //Configuro el sensor de proximidad en el pin 22
        var proximity = new global.five.Proximity({
            controller: "HCSR04",
            pin: 22
        });

        // Configuración de motores
        motor1 = new global.five.Motor({
            pins: {
                pwm: 10,
                dir: 7,
                cdir: 6,
            }
        });

        motor2 = new global.five.Motor({
            pins: {
                pwm: 11,
                dir: 8,
                cdir: 9,
            }
        });

        motor3 = new global.five.Motor({
            pins: {
                pwm: 13,
                dir: 5,
                cdir: 4,
            }
        });

        motor4 = new global.five.Motor({
            pins: {
                pwm: 12,
                dir: 2,
                cdir: 3,
            }
        });

        console.log("ready");
        //Avance por defecto de los 4 motores
        motor1.stop();
        motor2.stop();
        motor3.stop();
        motor4.stop();

    }
    )
}
)

app.listen(3000, function () {
    console.log('Pone el puerto 3000!');
});
