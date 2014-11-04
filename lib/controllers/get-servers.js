var validator = require('../validator')

module.exports = getServers

function getServers(req, res) {
  var store = res.store
  var app = req.context.app
  var version = req.params.version || req.headers['x-version'] || req.headers['version']

  if (store.has(app)) {
    res.json(200, store.getServers(app, version))
  } else {
    res.send(404)
  }
}
