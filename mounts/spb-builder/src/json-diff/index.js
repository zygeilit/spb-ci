require('colors')
var jsdiff = require('diff')
var oriAst = require('./demo-ori-ast.js')
var newAst = require('./demo-new-ast.js')

var diff = jsdiff.diffJson(oriAst, newAst)

diff.forEach(function (part) {
  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' : part.removed ? 'red' : 'grey'
  process.stderr.write(part.value[color])
})

console.log()
