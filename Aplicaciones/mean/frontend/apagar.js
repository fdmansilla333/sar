// shutdown.js

// Require child_process
var exec = require('child_process').exec;

// Create shutdown function
var os = require('os');

function shutdown(callback) {
    if (os.type()[0] === 'W' || os.type()[0] === 'w') {
        console.log('Es windows');
    } else {
        console.log('Es linux');
    }
    console.log(os.type());
    exec('shutdown -s -c "Apagado desde nodejs" -t 60', function (error, stdout, stderr) { callback(stdout); });
}

console.log(os.type()); // "Windows_NT"
console.log(os.release()); // "10.0.14393"
console.log(os.platform()); // "win32"

// Reboot computer
shutdown(function (output) {
    console.log(output);
});
function abortar(callback) {


    exec('shutdown -a', function (error, stdout, stderr) { callback(stdout); });
}

function reiniciar(callback) {


    exec('shutdown -r', function (error, stdout, stderr) { callback(stdout); });
}

abortar(function (output) {
    console.log(output);
});

reiniciar(function (output) {
    console.log(output);

});
abortar(function (output) {
    console.log(output);
});