var router = require('express').Router()

var {userExists, createUser} = require('../db/users')
var token = require('../auth/token')

router.post('/register', register, token.issue)

function register (req, res, next) {
  
  const {first_name, last_name, user_name, email_address, password} = req.body
  userExists(user_name)
    .then(exists => {
      if (exists) return res.status(400).send({message: "User Name Taken"})
      createUser(first_name, last_name, user_name, email_address, password)
        .then(() => next())
        .catch(err => {
          res.status(500).send({message: "Server Error"})
        })
    })
    .catch(err => res.status(500).send({message: "Server/db Error"}))
}



router.post('/login', token.issue)

module.exports = router
