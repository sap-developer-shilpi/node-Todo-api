const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail, // is same as ---- validator: (value) => { validator.isEmail(value); }
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
  }]
});

UserSchema.methods.toJSON = function(){
  var user = this;
  console.log(user);
  var userObj = user.toObject(); // this converts the user to an object user
  return _.pick(userObj, ['_id', 'email']);
}

// we used here normal functions because we want to bind this keyword, in an arrow func () =>{} is it not possible
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens = user.tokens.concat([{access, token}]);
   return user.save().then(() => {
    return token;
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = {User};
