const express = require('express')
const userRouter = express.Router()
const {getUsers,getUser,deleteUser,registerUser,verifyUser} = require('../controllers/userController.js')

// GET :'/api/users'
userRouter.get('/', getUsers)
userRouter.post('/register', registerUser)
userRouter.post('/verify', verifyUser)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)




  
 module.exports = {userRouter}