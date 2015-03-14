var atom = require('atom-shell')
var proc = require('child_process')

// will something similar to print /Users/maf/.../Atom
console.log(atom + ' ' + __dirname);

// spawn atom-shell
var child = proc.spawn(atom + ' ' + __dirname);
child.on('error', function (err) {
  console.error('error', err);
});
