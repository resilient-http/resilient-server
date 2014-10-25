var validator = require('../validator')

module.exports = getServers

function getServers(req, res) {
  var store = res.store
  var app = req.context.app

  if (store.has(app)) {
    res.json(200, store.get(app))
  } else {
    res.send(404)
  }
}
