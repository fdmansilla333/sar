const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const MINIMODISTANCIA = 20;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/sar', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};

var ports = [{ id: "mega", port: "/dev/ttyACM0" },
{ id: "nano", port: "/dev/ttyUSB0" }
];

var five = require("johnny-five");

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
        board: this.byId("mega"),
        freq: 1000 //Frecuencia en msg

    });
    //Configuro el sensor de temperatura
    var thermometer = new five.Thermometer({
        controller: "DS18B20",
        pin: 2,
        board: this.byId("nano")
    });

    var gps = new five.GPS({
        pins: {
            rx: 15,
            tx: 14,
            board: this.byId("mega")
        }
    });

    // si latitud o longitud cambian
    gps.on("ready", function () {
        console.log("position");
        console.log("  latitude   : ", this.latitude);
        console.log("  longitude  : ", this.longitude);
        console.log("  altitude   : ", this.altitude);

        connection((db) => {
            db.collection('gps')
                .insert({ "latitude": this.latitude, "longitude": this.longitude, "altitude": this.altitude, "fecha": new Date() })
                .then((muestrasGPS) => {
                    console.log('Insertando muestra GPS');
                })
                .catch((err) => {
                    console.log('Error al insertar GPS');
                });
        });
    });
    // If speed, course change log it
    gps.on("navigation", function () {
        console.log("navigation");
        console.log("  speed   : ", this.speed);
        console.log("  course  : ", this.course);
        connection((db) => {
            db.collection('navegacion')
                .insert({ "velocidad": this.speed, "curso": this.course, "fecha": new Date() })
                .then((muestrasGPS) => {
                    console.log('Insertando muestra navegacion');
                })
                .catch((err) => {
                    console.log('Error al insertar GPS');
                });
        });
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

    var distanciaAdelante = 0;


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
        //Agregado para generar hora
        var ahora = new Date();
        var hora = ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
        var fechaAlmacenar = ahora.getFullYear() + '/' + (ahora.getMonth() + 1) + '/' + ahora.getDate();

        connection((db) => {
            db.collection('temperaturas')
                .insert({ "valor": this.celsius, "fecha": fechaAlmacenar, "hora": hora, "fechaSys": ahora })
                .then((temperaturas) => {
                    console.log('Insertando temperatura:' + this.celsius);
                    db.close();
                })
                .catch((err) => {
                    console.log('Error al insertar');
                });
        });
    });

    sensor.on("change", function (value) {
        connection((db) => {
            var ahora = new Date();
            hora = ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
            db.collection('monoxidos')
                .insert({ "valor": sensor.scaleTo([20, 2000]), "fecha": new Date(), "hora": hora })
                .then((sensorMQ7) => {
                    console.log('Insertando MQ7');
                    console.log(sensor.scaleTo([20, 2000]) + 'ppm'); // float
                    db.close();

                })
                .catch((err) => {
                    console.log('Error al insertar valores de mq7');
                });
        });
    });

    // Si se generan modificaciones en la distancia de objetos, paran o avanzan los motores
    proximityAdelante.on("change", function () {

        if (proximityAdelante.cm <= MINIMODISTANCIA) {

            stop();
        }

    });

    router.get('/arriba', (req, res) => {
        console.log('Accionando arriba');
        if (proximityAdelante.cm > MINIMODISTANCIA) {
            motor1.forward(255);
            motor2.forward(255);
            motor3.forward(255);
            motor4.forward(255);

            res.json("ok");
        } else {
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

    });

    router.get('/derecha', (req, res) => {
        console.log('Accionando derecha');
        motor1.reverse(255);
        motor2.forward(255);
        motor3.reverse(255);
        motor4.forward(255);

        res.json("ok");
    });
    router.get('/abajo', (req, res) => {
        console.log('Accionando abajo');

        motor1.reverse(255);
        motor2.reverse(255);
        motor3.reverse(255);
        motor4.reverse(255);

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

    router.get('/ultrasonido', (req, res) => {
        res.json([{ ultrasonidoAdelante: proximityAdelante.cm },
        { ultrasonidoDerecho: proximityDerecho.cm },
        { ultrasonidoIzquierdo: proximityIzquierdo.cm }
        ]);
    });

    router.get('/gps', (req, res) => {
        res.json({
            latitud: gps.latitude,
            longitud: gps.longitude,
            altitud: gps.altitude,
            velocidad: gps.speed,
            sat: gps.sat,
            curso: gps.course,
            tiempo: gps.time

        });
    });
    router.get('/temperatura', (req, res) => {
        res.json({
            temperatura: thermometer.celsius, unidad: "celsius"
        });
    });

    router.get('/monoxido', (req, res) => {
        res.json({ monoxido: sensor.scaleTo([20, 2000]), unidad: "ppm" });
    });

});

module.exports = router;
