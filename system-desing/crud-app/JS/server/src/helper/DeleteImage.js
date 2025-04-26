const fs = require('fs').promises;
const {User} = require('../models/userModel.js');
const deleteImage = async(userImage) => {
   try {
    
    await fs.access(userImage);
    await fs.unlink(userImage);
     console.log('Image deleted!');

   } catch (error) {
    console.error('Image not found!')
   }
}

module.exports ={deleteImage}