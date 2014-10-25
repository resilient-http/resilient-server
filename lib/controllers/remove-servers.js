var validator = require('../validator')

module.exports = removeServers

function removeServers(req, res) {
  var store = res.store
  var app = req.context.app

  if (store.has(app)) {
    store.remove(app)
    res.send(204)
  } else {
    res.send(404)
  }
}
