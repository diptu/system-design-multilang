const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs')
const { DEFAULT_USER_IMAGE } = require('../secret');
const saltRounds = 10;
const Users = new Schema({
    first_name: { 
        type: String, 
        required: false,
        trim : true,
        lowercase : true,
        maxlength : [50, 'First Name can not be more than 50 characters'],
    },
    last_name: { 
      type: String, 
      required: [true,'Last Name Required'],
      trim : true,
      lowercase : true,
      maxlength : [50,'Last Name can not be more than 50 characters'],

  },
    email: { 
        type: String, 
        required: [true,'Email Required'],
        unique : true,
        trim : true,
        lowercase : true,
        validate : {
            validator: function (v) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v); //
            },
            message: 'Please enter a valid email address',
        }
  
    },
    password: { 
        type: String, 
        // required: [true,'Password Required'],
        minlength : [8, 'Manimum length of Password  can be 8 characters'],

        validate : {
            validator: function (v) {
                /*min 8 letter password, with at least a symbol, 
                upper and lower case letters and a number
                */
                var strongPassRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                return strongPassRegex.test(v);
            },
            message: 'Please enter a valid password',
        },

        //Store hash in your password DB.
        set : function (PlaintextPassword) {
           return bcrypt.hashSync(PlaintextPassword, bcrypt.genSaltSync(saltRounds));
        },

    },
    bio: { 
        type: String, 
        required: false,
    },
    
    image: { 
        type: String, 
        default:  DEFAULT_USER_IMAGE
  
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    phone: { 
      type: String, 
      required: [true,'Phone number required'],
  },
    isBanned:{
        type:Boolean,
        default: false,
    }


    
  },{timestamps:true});
  
const User = model('User',Users);



module.exports = {User};