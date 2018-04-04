const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MINIMODISTANCIA = 20;
/*Esto es para apagar*/
const control = require('./apagar');
console.log(control.saludar());


if (process.env.AMBIENTE == 'DESARROLLO') {
    console.log('Iniciado desarrollo');
    var hola = require('./hola');
    module.exports = hola;
} else {
    console.log('Iniciado Test');
    var placas = require('./placas');
    module.exports.placas = placas;
}


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
    var lista = [];
    connection((db) => {
        db.collection('temperaturas')
            .distinct("fecha").then((fechas) => {

                fechas.forEach(f => {
                    db.collection("temperaturas")
                        .find({ "fecha": f }, { "valor": 1, "hora": 1, "_id": 0 }).sort({ "fecha": 1, "hora": 1 }).batchSize(30000)
                        .toArray(function (err, result) {
                            if (err) throw err;
                            lista.push({ series: result, fecha: f });

                            if (lista.length === fechas.length) {

                                console.log('Mostrando ----****');
                                console.log(lista[5].series.length);
                                console.log(lista[5].fecha);
                                res.json(lista);
                                db.close();
                            }

                        });
                });


            })
            .catch((err) => {
                sendError(err, res);
            })
    });
});

router.get('/monoxidos', (req, res) => {
    connection((db) => {
        db.collection('mq7')
            .find()
            .toArray()
            .then((valores) => {
                response = valores;
                res.json(response);
                db.close();
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/monoxidosActual', (req, res) => {
    var ahora = new Date();
    var despues = new Date();
    despues.setSeconds(ahora.getSeconds() + 5);

    hora1 = ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
    hora2 = despues.getHours() + ':' + despues.getMinutes() + ':' + despues.getSeconds();
    // console.log('Buscando con '+hora1+' y '+hora2);

    connection((db) => {
        db.collection('monoxidos')
            .findOne({ "hora": { $gte: hora1, $lte: hora2 } }, { "valor": 1, "hora": 1, "_id": 0 },
                function (err, result) {
                    if (err) throw err;
                    // console.log(result);
                    res.json(result);
                    db.close();
                });

    });
});


/*
Se exportan las variables para que sean conocidas por Nodejs
*/

router.get('/apagar', (req, res) => {
    console.log('LLego solicitud de apagado...');
    control.apagar();
});

router.get('/reiniciar', (req, res) => {
    console.log('Llego solicitud de reinicio...');
    control.reiniciar();
});

module.exports.rutas = router;
