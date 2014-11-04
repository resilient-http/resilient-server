var validator = require('../validator')

module.exports = removeServers

function removeServers(req, res) {
  var store = res.store
  var app = req.context.app
  var version = req.params.version || req.headers['x-version'] || req.headers['version']

  if (store.has(app)) {
    store.remove(app, version)
    res.send(204)
  } else {
    res.send(404)
  }
}
