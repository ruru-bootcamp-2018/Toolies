const router = require('express').Router()
const verifyJWT = require('express-jwt')
const { getSecret, handleError } = require('../auth/token')
const gearDB = require('../db/gear')

// public routes

router.get('/single/:id', (req, res) => {
  const gearID = Number(req.params.id)

  gearDB.getGearByGearId(gearID)
    .then(gear => {
      res.json(gear)
    })
    .catch(err => {
      res.status(500).send({
        message: 'error grabbing single item',
        err
      })
    })
})

router.get('/all', (req, res) => {
  gearDB.getGear()
    .then(gearList => {
      res.json(gearList)
    })
    .catch(err => {
      res.status(500).send({
        message: 'error grabbing full gear list',
        err
      })
    })
})

router.use(
  verifyJWT({
    secret: getSecret
  }),
  handleError
)

// PROTECTED ROUTES

router.post('/new', (req, res) => {
  const newItem = req.body

  gearDB.addGear(newItem)
    .then(ids => {
      res.json({
        gear: newItem,
        id: ids[0]
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'error adding gear item',
        err
      })
    })
})

router.post('/update/:id', (req, res) => {
  const updateInfo = req.body
  const itemID = req.params.id

  gearDB.updateGear(updateInfo, itemID)
    .then(numUpdates => res.status(200).send({numUpdates}))
    .catch(err => {
      res.status(500).send({
        message: 'error updating gear item',
        err
      })
    })
})

router.delete('/delete/:id', (req, res) => {
  const itemID = req.params.id

  gearDB.removeGearById(itemID)
    .then(res.sendStatus(200))
    .catch(err => {
      res.status(500).send({
        message: 'error removing gear item',
        err
      })
    })
})

module.exports = router