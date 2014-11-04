var controllers = require('./controllers')

module.exports = function (server) {
  server.get('/all', controllers.allServers)
  server.get('/:app', controllers.getServers)
  server.post('/:app', controllers.setServers)
  server.put('/:app', controllers.setServers)
  server.del('/:app', controllers.removeServers)
}
