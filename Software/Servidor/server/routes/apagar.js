// shutdown.js

// Require child_process
var exec = require('child_process').exec;

// Create shutdown function
var os = require('os');

var apagar=function shutdown() {
    if (os.type()[0] === 'W' || os.type()[0] === 'w') {
        console.log('Es windows');
    } else {
        console.log('Es linux');
    }
    console.log(os.type());
    exec('shutdown -h now', function (error, stdout, stderr) { console.log(stdout); });
}


var reiniciar = function reiniciar() {
    exec('shutdown -r now', function (error, stdout, stderr) { console.log(stdout); });
}

var saludar = function saludar (callback) {
	console.log('Hola desde apagar.js');
}



module.exports.reiniciar = reiniciar;
module.exports.apagar = apagar;
module.exports.saludar = saludar;
