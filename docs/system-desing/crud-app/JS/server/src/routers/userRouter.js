const express = require('express')
const userRouter = express.Router()
const {getUsers} = require('../controllers/userController.js')

// GET :'/api/users'
userRouter.get('/', getUsers)
  
 module.exports = {userRouter}