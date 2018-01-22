require('colors')
var jsdiff = require('diff')

var one = {
  a: 123,
  b: 321
};
var other = {
  a:123,
  b: 4321
};

var diff = jsdiff.diffJson(one, other);

diff.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' :
    part.removed ? 'red' : 'grey'
  process.stderr.write(part.value[color]);
});

console.log()
