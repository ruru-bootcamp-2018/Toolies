const router = require('express').Router()
const verifyJWT = require('express-jwt')
const { getSecret, handleError } = require('../auth/token')
const requestDB = require('../db/requests')

router.use(
    verifyJWT({
        secret: getSecret
    }),
    handleError
)

router.post('/new', (req, res) => {
    const request = req.body

    requestDB.insertRequest(req.body)
        .then(() => {
            res.json({
                message: 'All is well with the world'
            })
        })
        .catch(err => {
            console.log(err);

            res.status(500).send({
                message: 'error adding new request to DB',
                err
            })
        })
})

module.exports = router