const express = require('express')
const userRouter = express.Router()
const {getUsers,getUser,deleteUser,registerUser,verifyUser} = require('../controllers/userController.js')
const { upload } = require('../middleweres/UploadFile.js')

// GET :'/api/users'
userRouter.get('/', getUsers)
userRouter.post('/register',upload.single('image'),registerUser)
userRouter.post('/verify', verifyUser)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)




  
 module.exports = {userRouter}