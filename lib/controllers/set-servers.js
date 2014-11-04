var validator = require('../validator')

module.exports = setServers

function setServers(req, res) {
  var store = res.store
  var app = req.context.app
  var version = req.params.version || req.headers['x-version'] || req.headers['version']

  if (validator(req, res)) {
    store.set(app, req.body, version)
    res.send(204)
  }
}
