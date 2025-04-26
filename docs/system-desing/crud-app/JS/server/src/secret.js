const dotenv = require('dotenv').config()
// read from `.env` if not found set 3000 as default port
PORT = process.env.PORT || 3000
const DB_NAME = process.env.DB_NAME || 'crud-api';
const DEFAULT_USER_IMAGE = process.env.DEFAULT_USER_IMAGE || 'public/images/users/user-default.png';
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://localhost:27017/${DB_NAME}`;

JWT_ACTIVATION_KEY = process.env.JWT_ACTIVATION_KEY || "NAD1m6K3CStyHbZwhaWqRb12ebQSN7BE"
JWT_EXPIRE = process.env.JWT_EXPIRE || "10m"
module.exports = {PORT,
    MONGO_DB_URL,
    DEFAULT_USER_IMAGE,
    JWT_ACTIVATION_KEY,
    JWT_EXPIRE
}
