var expect = require('chai').expect
var Server = require('../lib/server')
var request = require('superagent')

describe('Server', function () {
  var server = null

  it('should start the server', function (done) {
    server = Server({ port: 9898, silent: true })
    server.on('ready', function () {
      done()
    })
    server.start()
  })

  it('should be listening', function (done) {
    request.get('http://localhost:9898/app', function (err, res) {
      expect(res.statusCode).to.be.equal(404)
      done()
    })
  })

  it('should register an app servers', function (done) {
    request.post('http://localhost:9898/app')
      .send(['http://server.me'])
      .set('Content-Type', 'application/json')
      .end(function (res) {
        expect(res.statusCode).to.be.equal(204)
        done()
      })
  })

  it('should exists the app', function (done) {
    request.get('http://localhost:9898/app', function (err, res) {
      expect(res.statusCode).to.be.equal(200)
      done()
    })
  })

  it('should retrieve the server list', function (done) {
    request.get('http://localhost:9898/all', function (err, res) {
      expect(res.statusCode).to.be.equal(200)
      expect(res.body[0].name).to.be.equal('app')
      expect(res.body[0].versions[0].servers).to.be.deep.equal(['http://server.me'])
      done()
    })
  })

  it('should remove a registered app', function (done) {
    request.del('http://localhost:9898/app', function (err, res) {
      expect(res.statusCode).to.be.equal(204)
      request.get('http://localhost:9898/app', function (err, res) {
        expect(res.statusCode).to.be.equal(404)
        done()
      })
    })
  })

})
