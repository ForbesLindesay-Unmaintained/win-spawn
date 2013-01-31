var cSpawn = require('child_process').spawn;
var os = require('os').type();

module.exports = spawn;
function spawn(command, args, options) {
  if (os === 'Windows_NT') {    
    args = args || [];
    options = options || {};
    var match, matchA;
    if (matchA = /((?:[A-Z_]+\=[^ \=]+ )+)?([^\r\n]+)/.exec(command)) {
      try {
        var file = require('fs').readFileSync(matchA[2], 'utf8');
        if (match = /\#\!\/usr\/bin\/env ([^\r\n]+)/.exec(file)) {
          args.unshift(matchA[2]);
          command = (matchA[1] || '') + match[1];
        }
      } catch (ex) { }
    }

    if (match = /((?:[A-Z_]+\=[^ \=]+ )+)([^\r\n]+)/.exec(command)) {
      command = match[2];

      options.env = options.env || shallowClone(process.env);

      var env = match[1].split(' ');
      env.forEach(function (v) {
        v = v.split('=');
        if (v.length === 2) {
          options.env[v[0]] = v[1];
        }
      });
    }

    args.unshift(command);
    args.unshift('/c');
    command = 'cmd';
  }
  return cSpawn(command, args, options);
}

function shallowClone(obj) {
  var out = {};
  Object.keys(obj)
    .forEach(function (key) {
      out[key] = obj[key];
    });
  return out;
}