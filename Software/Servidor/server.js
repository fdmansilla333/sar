const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) { 
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
	next(); 
});


// API location
app.use('/api', api.rutas);
app.use('/api', api.placas);

// Enviar todo lo otro a Angular
app.get('*', (req, res) => {
	if (process.env.AMBIENTE == 'DESARROLLO'){
		//Estoy levantando angular en puerto 4200
	  res.status(404).send('Estas en desarrollo');
	}else{
    res.sendFile(path.join(__dirname, 'dist/index.html'));
	}
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
