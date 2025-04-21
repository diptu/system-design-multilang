
const createError = require('http-errors')
const { User } = require('../models/userModel.js')
const { findById } = require('../services/findById.js')
const { successResponse } = require('../helper/responsehandler.js')


// GET :'/api/users'
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    // return all but password field
    const options = { password: 0 }
    const searchRegex = new RegExp('.*' + search + '.*', 'i');
    const filter = {
      isAdmin: { $ne: true },

      $or: [
        { last_name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ]
    }

    const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit);
    // count num users
    const count = await User.find(filter).countDocuments();

    if (!users) throw createError(404, 'no user found');

    return successResponse(res, {
      statusCode: 200,
      message: 'Users returned!',
      payload: {
        data: users,
        Pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 < Math.ceil(count / limit) ? page + 1 : null,
        }

      }
    })

  } catch (error) {
    next(error);
  }
}



// GET :'/api/users/:id'
const getUser = async (req, res, next) => {
    const userId = req.params.id;
        // return all but password field
        const options = { password: 0 }
    const user = await findById(userId,options);

    return successResponse(res, {
      statusCode: 200,
      message: 'User returned!',
      payload: {
        data: user,
      }
    })

}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // return all but password field
    const options = { password: 0}
    const model = User

    const user = await findById(model, id,options);
    const userImage = user.image;
    
    deleteImage(userImage);

    await model.deleteOne({
      _id : id, 
      isAdmin : false,
    });
    successResponse(res, {
      message: 'User was removed successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }

}
module.exports = { getUsers, getUser,deleteUser };
