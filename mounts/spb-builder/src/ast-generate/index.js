var acorn = require('acorn')
var walk = require("acorn/dist/walk")
var fs = require('fs')

require('acorn-jsx/inject')(acorn)
require('acorn-es7-plugin')(acorn)

var jsDomeFileContent = fs.readFileSync(`${__dirname}/demo-react-cmp.js`, { encoding: 'utf8' })

var ast = acorn.parse(jsDomeFileContent, {
  'sourceType': 'module', // 支持import/export
  'locations': true, // 是否携带行号，列好
  'plugins': { jsx: true },
  'onComment': function (block, text, start, end, pos, pos1) {
  	console.log('------------start----------------')
  	console.log(block)
  	console.log(text.trim())
  	console.log(start)
  	console.log(end)
  	console.log(pos)
  	console.log(pos1)
  	console.log('-------------end------------')
  }
})

fs.writeFile(`${__dirname}/ast-demo-react-cmp.json`, JSON.stringify(ast, null, 2))
console.log('Ast-Json Generated')
