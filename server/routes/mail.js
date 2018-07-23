const router = require('express').Router()
const verifyJWT = require('express-jwt')
const { getSecret, handleError } = require('../auth/token')
const gearDB = require('../db/gear')
const userDB = require('../db/users')

const {sendRequest} = require('../mail/sendGrid')

router.use(
    verifyJWT({
        secret: getSecret
    }),
    handleError
)

router.post('/request', (req, res) => {
    Promise.all([
        gearDB.getGearByGearIdWithUser(req.body.gearId),
        userDB.getUserById(req.user.user_id)
    ])
    .then(([item, requester]) => {
        return sendRequest(item, requester)
    })
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(err);
        
        res.status(500).send({
            message: 'error sending mail request',
            err
        })
    })
})

module.exports = router