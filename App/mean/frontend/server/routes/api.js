//https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MINIMODISTANCIA = 20;

var five = require("johnny-five");
//var board = new five.Board;
var cont = 0;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/sar', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


router.get('/temperaturas', (req, res) => {
    console.log('solicitando temperaturas');
    connection((db) => {
        db.collection('temperatura')
            .find()
            .toArray()
            .then((temperaturas) => {
                response = temperaturas;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


/**
 * Implementar con constantes...
 * Estos metodos deben ser atomicos y son los que requiere el movimiento
 */


console.log('otros metodos');

//var board = new five.Board();

  var ports = [{ id: "mega", port: "/dev/ttyACM0" },
  { id: "nano", port: "/dev/ttyUSB0" }
  ];

new five.Boards(ports).on("ready", function () {
    //Se enciende la placa
    var motor1;
    var motor2;
    var motor3;
    var motor4;
    
	// configuro el sensor de monoxido
	//Se enciende la placa
    var sensor = new five.Sensor({
	pin: "A0",
	board: this.byId("mega")

	});


    

    //Configuro el sensor de temperatura
    var thermometer = new five.Thermometer({
      controller: "DS18B20",
      pin: 2,
      board: this.byId("nano")
    });


    //Configuro el sensor de proximidad en el pin 22
    var proximityAdelante = new five.Proximity({
        controller: "HCSR04",
        pin: 22,
        board: this.byId("mega")
    });

    var proximityDerecho = new five.Proximity({
        controller: "HCSR04",
        pin: 24,
        board: this.byId("mega")
    });

    var proximityIzquierdo = new five.Proximity({
        controller: "HCSR04",
        pin: 26,
        board: this.byId("mega")
    });

    var distanciaAdelante=0;


    motor1 = new five.Motor({
        pins: {
            pwm: 10,
            dir: 7,
            cdir: 6,
            board: this.byId("mega")
        }
    });

    motor2 = new five.Motor({
        pins: {
            pwm: 11,
            dir: 8,
            cdir: 9,
            board: this.byId("mega")
        }
    });

    motor3 = new five.Motor({
        pins: {
            pwm: 13,
            dir: 5,
            cdir: 4,
            board: this.byId("mega")
        }
    });

    motor4 = new five.Motor({
        pins: {
            pwm: 12,
            dir: 2,
            cdir: 3,
            board: this.byId("mega")
        }
    });

    function stop() {
        motor1.stop();
        motor2.stop();
        motor3.stop();
        motor4.stop();
    }
    
    //Muestro la temperatura
    thermometer.on("change", function () {
      //console.log(this.celsius + "°C");


		connection((db) => {
        		db.collection('temperatura')
            		.insert({"temperatura":this.celsius, "fecha": new Date()})
               .then((temperaturas) => {
                console.log('Insertando temperatura');
            })
            .catch((err) => {
                console.log('Error al insertar');
            });
    });

	sensor.on("change", function (value) {
      		connection((db) => {
			db.collection('mq7')
			.insert({"sensorMQ7":value, "fecha": new Date()})
			.then((sensorMQ7) => {
				console.log('Insertando MQ7');
			})
			.catch((err)=> {
				console.log('Error al insertar valores de mq7');
			});
		});
    
	//db.collection('temperatura').insert({"valor":this.celsius, "fecha": new Date()});
       //console.log("0x" + this.address.toString(16));
    	});

    // Si se generan modificaciones en la distancia de objetos, paran o avanzan los motores
    proximityAdelante.on("change", function () {
        // console.log("Entro a change", cont);
        /*proximityAdelante.on("data", function () {
            //console.log("  cm  : ", this.cm);
            // console.log("Entro a data");
        });*/
        //cont++;

        if (proximityAdelante.cm <= MINIMODISTANCIA) {

            stop();
        }

    });

    router.get('/arriba', (req, res) => {
        console.log('Accionando arriba');
	if (proximityAdelante.cm > MINIMODISTANCIA){
        motor1.forward(255);
        motor2.forward(255);
        motor3.forward(255);
        motor4.forward(255);
        /*board.wait(1000, function () {
            console.log('Fin arriba');
            motor1.stop();
            motor2.stop();
            motor3.stop();
            motor4.stop();
        });*/
	res.json("ok");
	}else{
        res.json("{'error':'objeto adelante'}");
	}

    });

    router.get('/izquierda', (req, res) => {
        console.log('Accionando izquierda');
        res.json("ok");
        motor1.forward(255);
        motor2.reverse(255);
        motor3.forward(255);
        motor4.reverse(255);
        /*board.wait(1000, function () {
            console.log('Fin izquierda');
            motor1.stop();
            motor2.stop();
            motor3.stop();
            motor4.stop();
        });*/
    });

    router.get('/derecha', (req, res) => {
        console.log('Accionando derecha');
        motor1.reverse(255);
        motor2.forward(255);
        motor3.reverse(255);
        motor4.forward(255);
        /* board.wait(1000, function () {
             console.log('Fin derecha');
             motor1.stop();
             motor2.stop();
             motor3.stop();
             motor4.stop();
         });*/
        res.json("ok");
    });
    router.get('/abajo', (req, res) => {
        console.log('Accionando abajo');

        motor1.reverse(255);
        motor2.reverse(255);
        motor3.reverse(255);
        motor4.reverse(255);
        /*board.wait(1000, function () {
            console.log('Fin abajo');
            motor1.stop();
            motor2.stop();
            motor3.stop();
            motor4.stop();
        });*/
        res.json("ok");

    });

    router.get('/stop', (req, res) => {
        console.log('deteniendo');
        motor1.stop();
        motor2.stop();
        motor3.stop();
        motor4.stop();
        res.json("ok");
    });

});


module.exports = router;
