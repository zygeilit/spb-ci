
var path = require('path')
var fs = require('fs')
var shell = require('shell')

// 接受的参数
var args = process.argv.slice(2)

// 提交的项目代码路径
var workdir = args[0]
console.log(`项目代码路径: ${workdir}`)

var builderJsonPath = `${workdir}/.builder.json`
var builderJsonContentString = fs.readFileSync(builderJsonPath, 'utf-8')

var builderJson = JSON.parse(builderJsonContentString)

// docs
if (builderJson.doc) {
  var docModel = builderJson.doc
  var res = shell.exec(`curl http://doc-server:3000/add?type=${docModel.type}&author=${docModel.author}&keywords=${docModel.keywords}`)
  console.log(res)
}
