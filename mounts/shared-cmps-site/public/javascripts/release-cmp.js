
function releaseCmp () {

  var name = $('#cmp-name').val()
  var code = $('#cmp-code').val()
  var type = $('#cmp-type').val()
  var description = $('#cmp-description').val()
  var metadata = window.aceEditor.getValue()
  var currentUser = AV.User.current()

  var Component = AV.Object.extend('Components')
  var cmp = new Component()

  if (window.location.search) {
    let objectIdKey = window.location.search.replace(/[\?]/, '')
    let objectId = objectIdKey.split('=')[1]
    var query = new AV.Query('Components')
    query.get(objectId, {
      success: function(obj) {
        obj.set('name', name)
        obj.set('code', code)
        obj.set('description', description)
        obj.set('metadata', JSON.parse(metadata))
        obj.set('type', type)
        obj.set('owner', AV.User.current())
        obj.save().then(function () {
          window.location.href = "/"
        }, function(error) {
          alert(JSON.stringify(error))
        })
      },
      error: function(obj, err) {
        console.log(err.message)
      }
    })
  } else {
    cmp.set('name', name)
    cmp.set('code', code)
    cmp.set('description', description)
    cmp.set('metadata', JSON.parse(metadata))
    cmp.set('type', type)
    cmp.set('owner', AV.User.current())
    cmp.save().then(function() {
      window.location.href = "/"
    }, function(error) {
      alert(JSON.stringify(error))
    })
  }
}
