var URL_REGEX = /^(?:([^:\/?#]+):\/\/)((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?)?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i

module.exports = validator

function validator(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    res.json(415, { message: 'Request content type must be application/json'})
    return false
  }
  if (!validator.validatePayload(req)) {
    res.json(400, { message: 'Invalid JSON payload' })
    return false
  }
  return true
}

validator.validatePayload = function (req) {
  var filteredBody, body = req.body
  if (Array.isArray(body)) {
    filteredBody = body.filter(function (uri) {
      return typeof uri === 'string' && isValidURI(uri)
    })
    req.body = filteredBody
    return filteredBody.length > 0
  }
  return false
}

function isValidURI(str) {
  return URL_REGEX.test(str)
}
