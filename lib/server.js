var _ = require('lodash')
var restify = require('restify')
var EventEmitter = require('events').EventEmitter
var Store = require('./store')
var defineEndpoints = require('./api')
var pkg = require('../package.json')

module.exports = function (options) {
  return new Server(options)
}

function Server(options) {
  this.options = _.merge({}, this.options, options)
  this.store = new Store()
}

Server.prototype = Object.create(EventEmitter.prototype)

Server.prototype.options = {
  host: '0.0.0.0',
  port: 8080,
  apitoken: null,
  debug: false,
  silent: false
}

Server.prototype.start = function () {
  try {
    this._createServer()
  } catch (e) {
    this.emit('error', e)
  }
  return this
}

Server.prototype._createServer = function () {
  this.server = restify.createServer({
    name: pkg.name,
    version: pkg.version
  })

  this.server.use(restify.bodyParser())
  this.server.use(restify.queryParser())
  this.server.use(restify.gzipResponse())
  this.server.use(restify.fullResponse())
  this.server.use(setCORS)
  this.server.use(exposeInjections(this))
  this.server.opts(/\.*/, function (req, res) { res.send(204) })
  if (!this.options.silent) this.server.use(logger)
  if (this.options.apitoken) this.server.use(validateAPIToken(this))

  defineEndpoints(this.server)
  this.server.listen(this.options.port, function () {
    this.emit('ready', this.options)
  }.bind(this))
}

Server.prototype.stop = function () {
  this.server.close(function () {
    this.emit('close')
  }.bind(this))
}

function validateAPIToken(app) {
  return function (req, res, next) {
    if (req.method !== 'OPTIONS' && req.method !== 'GET') {
      if (!req.headers['api-token'])
        return res.json(400, { message: 'Missing required header: API-Token' })
      if (req.headers['api-token'] !== app.options.apitoken)
        return res.json(401, { message: 'Invalid API token' })
    }
    next()
  }
}

function exposeInjections(app) {
  return function (req, res, next) {
    res.options = app.options
    res.store = app.store
    next()
  }
}

function logger(req, res, next) {
  console.log(new Date().toISOString() + ' - info - ' + req.connection.remoteAddress + ' [' + req.method + '] ' + req.url)
  next()
}

function setCORS(req, res, next) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'] || 'GET, POST, DELETE, PUT, PATCH')
    res.header('Access-Control-Allow-Origin', req.headers.origin)
  }
  next()
}
