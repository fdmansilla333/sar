//https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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

/**
 * Implementar con constantes...
 * Estos metodos deben ser atomicos y son los que requiere el movimiento
 */
console.log('otros meotdos');
router.get('/arriba', (req,res) => {
    console.log('Accionando arriba');
    res.json("ok");
});

router.get('/izquierda', (req,res) => {
    console.log('Accionando izquierda');
    res.json("ok");
});
router.get('/derecha', (req,res) => {
    console.log('Accionando derecha');
    res.json("ok");
});
router.get('/abajo', (req,res) => {
    console.log('Accionando abajo');
    res.json("ok");
    
});


module.exports = router;