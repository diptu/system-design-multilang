const createError = require('http-errors')
const mongoose = require('mongoose')
const { User } = require('../models/userModel.js')
const findById = async (userId, options={}) => {
    try {

        const item = await User.findById(userId, options);
        // count num users
        const count = await User.findById(userId).countDocuments();

        if (!item) throw createError(404, `item with id:${userId} dosen't exist`);

        return item;
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, 'Invalid item');
        }
        throw error;
    }

}

module.exports = { findById }