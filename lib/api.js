var controllers = require('./controllers')

module.exports = function (server) {
  server.get('/:app', controllers.getServers)
  server.post('/:app', controllers.setServers)
  server.put('/:app', controllers.setServers)
  server.del('/:app', controllers.removeServers)
}
