const express = require('express')
const userRouter = express.Router()
const {getUsers,getUser,deleteUser} = require('../controllers/userController.js')

// GET :'/api/users'
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)


  
 module.exports = {userRouter}