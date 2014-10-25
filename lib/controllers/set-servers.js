var validator = require('../validator')

module.exports = setServers

function setServers(req, res) {
  var store = res.store
  var app = req.context.app

  if (validator(req, res)) {
    store.set(app, req.body)
    res.send(204)
  }
}
