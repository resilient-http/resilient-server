var expect = require('chai').expect
var Store = require('../lib/store')

describe('Store', function () {
  var store = new Store()

  it('should define an app servers', function () {
    store.set('sample', ['http://localhost'])
  })

  it('should retrieve the app servers', function () {
    expect(store.getServers('sample')).to.be.deep.equal(['http://localhost'])
  })

  it('should register multiple servers versions', function () {
    store.set('sample', ['http://server-1.0'], '1.0.0')
    store.set('sample', ['http://server-1.1'], '1.1.0')
    store.set('sample', ['http://server-1.2'], '1.2.0')
    store.set('sample', ['http://server-1.5'], '1.5.0')
  })

  it('should resolve with highest version', function () {
    expect(store.getServers('sample')).to.be.deep.equal(['http://server-1.5'])
    expect(store.getServers('sample', '*')).to.be.deep.equal(['http://server-1.5'])
  })

  it('should resolve with a valid version using 1', function () {
    expect(store.getServers('sample', '1')).to.be.deep.equal(['http://server-1.5'])
  })

  it('should resolve with a valid version using 1.5', function () {
    expect(store.getServers('sample', '1.5')).to.be.deep.equal(['http://server-1.5'])
  })

  it('should resolve with a valid version using 1.2', function () {
    expect(store.getServers('sample', '1.2')).to.be.deep.equal(['http://server-1.2'])
  })

  it('should resolve with a valid version using 1.1', function () {
    expect(store.getServers('sample', '1.1')).to.be.deep.equal(['http://server-1.1'])
  })

  it('should resolve with a valid version using 1.1.0', function () {
    expect(store.getServers('sample', '1.1.0')).to.be.deep.equal(['http://server-1.1'])
  })

  it('should not resolve with version 1.4.5', function () {
    expect(store.getServers('sample', '1.4.5')).to.be.undefined
  })

  it('should not resolve with version 1.6', function () {
    expect(store.getServers('sample', '1.6')).to.be.undefined
  })

  it('should remove a specific version', function () {
    store.remove('sample', '1.5')
    expect(store.getServers('sample', '1.5')).to.be.undefined
  })
})
