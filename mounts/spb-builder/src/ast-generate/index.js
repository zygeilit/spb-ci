var acorn = require('acorn')
var walk = require("acorn/dist/walk")
var fs = require('fs')

require('acorn-jsx/inject')(acorn)
require('acorn-es7-plugin')(acorn)

var jsDomeFileContent = fs.readFileSync(`${__dirname}/demo-react-cmp.js`, { encoding: 'utf8' })

var ast = acorn.parse(jsDomeFileContent, {
  'sourceType': 'module', // 支持import/export
  'locations': true, // 是否携带行号，列好
  'plugins': { jsx: true }
})

console.log(JSON.stringify(ast))
