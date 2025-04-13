const express = require('express');
const morgan = require('morgan')
const app = express()

// setup the logger
app.use(morgan('dev'))
app.get('/products', (req, res) => {
    res.status(200).send(
         {
            'success': true,
            'msg':'products is returned'}
        );
  })
app.listen(3000, ()=>{
    console.log(`server running on http://localhost:3000`);
})