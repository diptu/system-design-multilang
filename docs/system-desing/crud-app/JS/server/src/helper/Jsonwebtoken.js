const jwt = require('jsonwebtoken');

const createJsonWebToken = (payload={}, secretKey, expire = '10m') => {
    if(!payload)
        throw Error('payload must be non empty object');

    if(secretKey=='')
        throw Error('secretKey must be non empty String');
        
    try {
        return jwt.sign({
            payload
        }, secretKey, { expiresIn: expire });
    } catch (error) {
        clg.Error('Failed to create jwt', error);
    }

}
module.exports = {createJsonWebToken}