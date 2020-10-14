var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    uppercase: true,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    uppercase: true,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    unique: true,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  permission: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//save the user's hashed password
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//create method to comare password
UserSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
