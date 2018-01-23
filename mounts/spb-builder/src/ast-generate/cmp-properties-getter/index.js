var acorn = require('acorn')
var walk = require("acorn/dist/walk")
var fs = require('fs')
var path = require('path')

require('acorn-jsx/inject')(acorn)
require('acorn-es7-plugin')(acorn)

var domeFilePath = path.join(__dirname, '..', '/react-todos/js/todoItem.js')

var jsDomeFileContent = fs.readFileSync(domeFilePath, { encoding: 'utf8' })

var ast = acorn.parse(jsDomeFileContent, {
  'sourceType': 'module', // 支持import/export
  'locations': false, // 是否携带行号，列好
  // 'ranges': false,
  'plugins': { jsx: true }
})

// fs.writeFile(path.join(__dirname, '..', 'ast-react-cmp.json'), JSON.stringify(ast, null, 2))

walk.findNodeAt(ast, null, null,
  function (nodeType, node) {
    // find: let|const|var <cmp-name> = React.createClass({ ... })
    if (nodeType === 'CallExpression') {
      let { type, object, property } = node.callee
      // React.createClass
      if (type === 'MemberExpression' && object.name === 'React' && property.name === 'createClass') {
        let [{ properties }] = node.arguments
        for (var i = 0; i < properties.length; i++) {
          console.log(properties[i].key.name)
        }
      }
    }
  }
)
