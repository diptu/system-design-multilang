const dotenv = require('dotenv').config()
// read from `.env` if not found set 3000 as default port
PORT = process.env.PORT || 3000
const DB_NAME = process.env.DB_NAME || 'crud-api';
const DEFAULT_USER_IMAGE = process.env.DEFAULT_USER_IMAGE || 'server/public/images/users/user-default.png';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://localhost:27017/${DB_NAME}`;
module.exports = {PORT,
    MONGO_DB_URL,
    DEFAULT_USER_IMAGE
}
