const express = require('express');
const router = express.Router();

console.log('Configurando hola.js');

router.get('/hola', (req, res) => {
    respuesta = 'ok';
    res.json(respuesta);

});

module.exports = router;
