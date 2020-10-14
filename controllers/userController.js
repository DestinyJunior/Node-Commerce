/* eslint-disable no-unused-vars */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');


// class UserController {
/**
   * Create new user
   * @param {*} req  Request
   * @param {*} res Response
   * @param {*} next
   */
exports.createUser = (req, res, next) => { 
  if (!req.body.password || !req.body.email) {
    return res.json({
      success: false,
      message: 'Please enter email and password to register.',
    });
  } else {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    //Attemt to save the new users
    User.create(newUser, (err, user) => {
      if (err) {
        console.log(newUser);
        return res.json({
          success: false,
          message: 'user already exist',
          error: err,
        });
      } else {
        res.json({
          success: true,
          message: 'User created.',
          user: user,
        });
      }
    });
  }
};

/**
   * Authenticate user or login user and get token
   * @param {*} req Request
   * @param {*} res Response
   */
exports.authenticate = (req, res) => {
  User.findOne(
    {
      email: req.body.email
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.send({
          success: false,
          message: 'Login failed',
        });
      } else {
        //Check if the password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwt.sign({ data: user }, config.secret, {
              expiresIn: 604800, //a week
            });
            res.json({ success: true, token: 'JWT ' + token, user: user });
          } else {
            res.send({ success: false, message: 'Password is Incorrect' });
          }
        });
      }
    }
  );
};

/**
   * Fetch Users
   * @param {*} req Request
   * @param {*} res Response
   */
exports.fetchAllUsers = (req, res) => {
  User.find()
    .then((user) => {
      res.json({
        success: true,
        message: 'users found',
        user: user,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: 'Not Found',
        user: null,
        error: err,
      });
    });
};

/**
   * update user
   * @param {*} req Request
   * @param {*} res Response
   */
exports.updateUser = (req, res) => {
  const query = req.query;
  const userId = query.id;
  delete query.id;

  User.findByIdAndUpdate(userId, query, { new: true })
    .then((user) => {
      res.json({
        success: true,
        message: 'user updated',
        user: user,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: 'user not found',
        user: null,
      });
    });
};
// }


