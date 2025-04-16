const express = require('express');
const {userRouter} = require('./routers/userRouter.js')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const app = express()


const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
	    message: 'Too many requests',
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
// setup the logger
app.use(morgan('dev'))

// parse application/json
app.use(bodyParser.json())

base_user_url = '/api/users'
// mount the router on the app
app.use(`${base_user_url}`, userRouter);

app.get('/products', (req, res) => {
    res.status(200).json(
         {
            'success': true,
            'msg':'products is returned'}
        );
  })


// client error handling
app.use(( req, res, next) => { 
  // http-errors   
  next(createError(404, 'Route Not Found')); // check error
})

// server error handling => all errors will be logged here
app.use((err, req, res, next) => {
   return res.status(err.status || 500).json({
      success : false,
      message : err.message
      })
    
})

module.exports = app