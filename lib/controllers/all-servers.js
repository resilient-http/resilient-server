var validator = require('../validator')

module.exports = allServers

function allServers(req, res) {
  res.json(200, res.store.all())
}
