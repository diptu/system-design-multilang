const {UPLOAD_DIR} = require('../secret.js');
const multer  = require('multer')
const path  = require('path');
const { extname } = require('path/posix');

// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
    const ext =  path.extname(file.originalname);
   
    cb(null, file.originalname.replace(path.extname(file.originalname),'') + '-' +  Date.now()+ext)
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = {upload}