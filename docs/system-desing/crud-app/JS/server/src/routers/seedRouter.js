const express = require('express')
const { seedUsers } = require('../controllers/seedController.js')
const seedRouter = express.Router()


// GET :'/api/users'
seedRouter.get('/users', seedUsers)
  
 module.exports = {seedRouter}