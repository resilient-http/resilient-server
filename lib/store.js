module.exports = Store

function Store() {
  this.store = {}
}

Store.prototype.get = function (app) {
  return this.store[app]
}

Store.prototype.getServers = function (app, version) {
  if (this.has(app)) {
    app = this.store[app]
    // to do, implement versions
    return app[0].servers
  }
}

Store.prototype.set = function (app, servers, version) {
  if (Array.isArray(servers)) {
    var app = this.store[app] = this.store[app] || [{ version: version || 'latest', servers: servers, time: Date.now() }]
  }
  return this
}

Store.prototype.remove = function (app, version) {
  if (this.has(app)) {
    this.store[app] = undefined
  }
  return this
}

Store.prototype.has = function (app) {
  return Object.prototype.hasOwnProperty.call(this.store, app) && Array.isArray(this.store[app])
}
