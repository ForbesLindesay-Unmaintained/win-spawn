var cSpawn = require('child_process').spawn;
var os = require('os').type();

module.exports = spawn;
function spawn(command, args, options) {
    if (os === 'Windows_NT') {
        args = ['/c', command].concat(args);
        command = 'cmd';
    }
    return cSpawn(command, args, options);
}