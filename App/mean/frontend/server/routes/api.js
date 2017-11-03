//https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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

/*
router.get('/temperaturas', (req, res) => {
    console.log('Entrando a temperaturas');
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
*/

/**
 * Implementar con constantes...
 * Estos metodos deben ser atomicos y son los que requiere el movimiento
 */


console.log('otros metodos');

var board = new five.Board();

board.on("ready", function () {
    //Se enciende la placa
    var motor1;
    var motor2;
    var motor3;
    var motor4;

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

    router.get('/arriba', (req, res) => {
        console.log('Accionando arriba');
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
