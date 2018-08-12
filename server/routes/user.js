const router = require('express').Router()
const verifyJWT = require('express-jwt')
const { getSecret, handleError } = require('../auth/token')
const { getUserByName, updateUser } = require('../db/users')
const { getGearByUserId } = require('../db/gear')
const { getRequests } = require('../db/requests')

router.use(
  verifyJWT({
    secret: getSecret
  }),
  handleError
)

// routes below here protected

router.get('/fullProfile', (req, res) => {
  Promise.all([
    getUserByName(req.user.user_name),
    getGearByUserId(req.user.user_id),
    getRequests(req.user.user_id)
  ])
    .then(([info, gear, messages]) => {
      const user = Object.assign(
        {},
        info,
        {gear, messages}
      )
      res.json(user)
    })
    .catch(err => {
      res.status(500)
        .send({
          message: 'error getting user info',
          err
        })
    })
})

router.put('/update', (req, res) => {
  const userUpdate = req.body
  const userId = req.user.user_id

  updateUser(userId, userUpdate)
    .then(ids => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).send({
        message: `error updating user: ${userId}`,
        err
      })
    })
})


module.exports = router