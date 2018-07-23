const jwt = require('jsonwebtoken')
const { getUserByName, getUsers } = require('../db/users')
const verifyJwt = require('express-jwt')


function issue(req, res) {
  getUserByName(req.body.user_name)
    .then(user => {
      const token = createToken(user, process.env.JWT_SECRET)
      res.json({
        message: 'Authentication successful',
        token
      })
    })
    .catch(err => {
      return res.status(403).json({
        message: 'Authentication failed.',
        info: err.message
      })
    })
}

function createToken(user, secret) {
  return jwt.sign({
    user_id: user.id,
    user_name: user.user_name
  }, secret, {
      expiresIn: '24h'
    })
}

function getSecret(req, payload, done) {
  done(null, process.env.JWT_SECRET)
}

function decode(req, res, next) {
  verifyJwt({ secret: getSecret })(req, res, next)
}

function handleError(err, req, res, next) {
  if (err) {
    return res.status(403).json({
      message: 'Access to this resource was denied.',
      error: err.message,
      info: 'Missing credentials'
    })
  }
  next()
}

module.exports = {
  issue,
  createToken,
  decode,
  getSecret,
  handleError
}
