const router = require('express').Router()
const { compare } = require('../auth/hash')

const { userExists, createUser, getUserByName } = require('../db/users')
const token = require('../auth/token')

router.post('/register',
  register,
  token.issue
)

router.post('/login',
  login,
  token.issue
)

function register(req, res, next) {
  userExists(req.body.user_name)
    .then(exists => {
      if (exists) res.status(400).send({ message: "User Name Taken" })
      else createUser(req.body)
        .then(id => next())
    })
    .catch(err => {
      res.status(500).send({ message: "Server Error" })
    })
}

function login(req, res, next) {
  getUserByName(req.body.user_name)
    .then(user => {
      if (!user) res.status(403).json({ message: 'User does not exist' })
      else compare(req.body.password, user.hash, (err, match) => {
        if (err) res.status(500).json({ message: err.message })
        else if (!match) res.status(400).json({ message: 'Password is incorrect' })
        else next()
      })
    })
    .catch(err => {
      res.status(500).send({ message: "Server Error" })
    })
}

module.exports = router
