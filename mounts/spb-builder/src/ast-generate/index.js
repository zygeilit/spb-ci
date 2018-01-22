var acorn = require('acorn')
var walk = require("acorn/dist/walk")
var fs = require('fs')

var jsDomeFileContent = fs.readFileSync(`${__dirname}/jscode-demo.js`, { encoding: 'utf8' })

var ast = acorn.parse(jsDomeFileContent)

console.log(JSON.stringify(ast))
