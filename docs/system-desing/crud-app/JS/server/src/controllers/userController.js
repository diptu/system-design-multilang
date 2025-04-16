
const createError = require('http-errors')
const User = require('../models/userModel.js')

  // GET :'/api/users'
const getUsers = (req, res, next) => {
      try {
        res.status(200).send(
            {
               'success': true,
              data : User
             }
           );
        
      } catch (error) {
        next(error);
      }
    }

module.exports = {getUsers};
 