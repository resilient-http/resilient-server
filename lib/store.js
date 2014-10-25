module.exports = Store

function Store() {
  this.store = {}
}

Store.prototype.get = function (app) {
  return this.store[app]
}

Store.prototype.set = function (app, servers) {
  if (Array.isArray(servers)) {
    this.store[app] = servers
  }
  return this
}

Store.prototype.remove = function (app) {
  if (this.has(app)) {
    this.store[app] = undefined
  }
  return this
}

Store.prototype.has = function (app) {
  return Object.prototype.hasOwnProperty.call(this.store, app)
      && Array.isArray(this.store[app])
}
