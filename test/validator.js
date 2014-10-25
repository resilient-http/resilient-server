var expect = require('chai').expect
var validator = require('../lib/validator')

describe('Validate payload', function () {
  it('should have a valid payload', function () {
    expect(validator.validatePayload({ body: ['http://test.org/me'] })).to.be.true
  })

  it('should not have a valid payload', function () {
    expect(validator.validatePayload({ body: ['test.org/me'] })).to.be.false
    expect(validator.validatePayload({ body: null })).to.be.false
    expect(validator.validatePayload({ body: {} })).to.be.false
    expect(validator.validatePayload({ body: 'test' })).to.be.false
    expect(validator.validatePayload({ body: [] })).to.be.false
  })
})
