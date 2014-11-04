var semver = require('semver')

module.exports = Store

function Store() {
  this.store = {}
}

Store.prototype.list = function (app) {
  return this.store[app]
}

Store.prototype.get = function (app, version) {
  version = version || '*'
  if (this.has(app)) {
    app = this.store[app]
    return findVersion(app, version)
  }
}

Store.prototype.getServers = function (app, version) {
  var data = this.get(app, version)
  if (data && data.servers) {
    return data.servers.slice(0)
  }
}

Store.prototype.set = function (app, servers, version) {
  var store = null
  if (Array.isArray(servers)) {
    version = version || '*'
    store = this.store[app] = this.store[app] || []
    if (versionNotExists(store, version)) {
      store.push({ version: version, servers: servers, time: Date.now() })
    }
  }
  return this
}

Store.prototype.remove = function (app, version) {
  var i, l
  if (this.has(app)) {
    if (version) {
      version = matchMaxSafistying(this.store[app], version)
      for (i = 0, l = this.store[app].length; i < l; i += 1) {
        if (this.store[app][i].version === version) {
          this.store[app].splice(i, 1)
          break
        }
      }
    } else {
      this.store[app] = undefined
    }
  }
  return this
}

Store.prototype.has = function (app) {
  return Object.prototype.hasOwnProperty.call(this.store, app) && Array.isArray(this.store[app])
}

function findVersion(servers, version) {
  var match
  if (servers.length <= 1) {
    match = servers[0]
  } else if (!version) {
    match = matchMaxSafistying(servers, '*')
    if (!match) match = servers[0]
  } else {
    match = matchMaxSafistying(servers, version)
    if (match) {
      match = servers.filter(function (server) {
        return server.version === match
      })[0]
    }
  }
  return match
}

function matchMaxSafistying(servers, version) {
  return semver.maxSatisfying(servers.map(function (server) {
    return semver.valid(server.version) && server.version
  }), version)
}

function versionNotExists(servers, version) {
  return servers.filter(function (server) {
    return server.version === version
  }).length === 0
}
