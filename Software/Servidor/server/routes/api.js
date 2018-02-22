//https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MINIMODISTANCIA = 20;
var mibd;


if (process.env.AMBIENTE == 'DESARROLLO'){
	console.log('Iniciado desarrollo');
	var hola=require('./hola');
	module.exports = hola;
}else{
	console.log('Iniciado Test');
	var placas = require('./placas');
	module.exports = placas; 
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
    console.log('solicitando temperaturas');
    connection((db) => {
        db.collection('temperaturas')
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

router.get('/monoxidos', (req, res) => {
    connection((db) => {
        db.collection('mq7')
            .find()
            .toArray()
            .then((valores) => {
                response = valores;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


/*
Se exportan las variables para que sean conocidas por Nodejs
*/

module.exports = router;


