
const createError = require('http-errors')
const { User } = require('../models/userModel.js')
const { findById } = require('../services/findById.js')
const { successResponse } = require('../helper/responsehandler.js')
const { deleteImage } = require('../helper/DeleteImage.js')
const { createJsonWebToken } = require('../helper/Jsonwebtoken.js')
const { EmailWithNodeMailer } = require('../helper/Email.js')
const { CLIENT_URL } = require('../secret.js')
const jwt = require('jsonwebtoken');
const { JWT_ACTIVATION_KEY, JWT_EXPIRE } = require('../secret.js')


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

// GET :'/api/users/verify-user'
const verifyUser = async (req, res, next) => {
  try {

    const token = req.body.token;
    if (!token)
      throw createError(404, 'token not found!');

    try {
      const decoded = jwt.verify(token, JWT_ACTIVATION_KEY);
      if(!decoded)
        throw createError(401, 'Unale to verify usser!');
      // Parse the payload string into a JavaScript object
      const new_user = JSON.parse(decoded.payload);
      const userExists = await User.exists({ email: new_user.email });
      if (userExists)
        throw createError(409, `User with email : ${new_user.email} already exist`);

      console.log(new_user);
      await User.create(new_user)
    } catch (err) {
      if(err.name ==='TokenExpiredError')
          throw createError(401, 'Token already exparied');
      else if(err.name ==='JsonWebTokenError')
        throw createError(401, 'Invalid Token');
      else 
        throw err;
    }
    successResponse(res, {
      message: `User activation successful`,
      statusCode: 201,

    });


  } catch (error) {
    next(error);
  }

}


// GET :'/api/users/:id'
const registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    const new_user = {
      first_name,
      last_name,
      email,
      password,
      phone
    }
    const userExists = await User.exists({ email: email });
    if (userExists)
      throw createError(409, `User with email : ${email} already exist`);

    // create jwt
    const token = createJsonWebToken(JSON.stringify({ first_name, last_name, email, password, phone }),
      JWT_ACTIVATION_KEY,
      JWT_EXPIRE
    );

    // prepare email
    const mailData = {
      email,
      subject: "Account Activation",
      html: `
    <h2>Hello ${last_name}</h2>
    please click the link below to activate your account:
    <a href="${CLIENT_URL}/${token}">Activate Your Account</a>
    `
    }
    // send email
    try {
      await EmailWithNodeMailer(mailData);
    } catch (error) {
      return next(createError(500, 'Failed to send varification email'));
    }


    successResponse(res, {
      message: `Please, check your ${email} to complete your registration`,
      statusCode: 201,
      payload: {
        user: token
      }
    });


  } catch (error) {
    next(error);
  }

}



// GET :'/api/users/:id'
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id || "";
    // return all but password field
    const options = { password: 0 }

    const user = await findById(User, id, options);
    successResponse(res, {
      message: 'User information returned successfully',
      statusCode: 200,
      payload: {
        user: user
      }
    });
  } catch (error) {
    next(error);
  }

}


// Delete :'/api/users/register'
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // return all but password field
    const options = { password: 0 }
    const model = User

    const user = await findById(model, id, options);
    const userImage = user.image;

    deleteImage(userImage);

    await model.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });
    successResponse(res, {
      message: 'User was removed successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }

}
module.exports = { getUsers, getUser, deleteUser, registerUser, verifyUser };
