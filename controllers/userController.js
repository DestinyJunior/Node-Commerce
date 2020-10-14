var User = require("../models/user");

class UserController {
  /**
   * Create new user
   * @param {*} req  Request
   * @param {*} res Response
   * @param {*} next
   */
  static createUser = (req, res, next) => { 
    if (!req.body.password || !req.body.phoneNo) {
      return res.json({
        success: false,
        message: "Please enter phone number and password to register.",
      });
    } else {
      let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        role: req.body.role,
        permission: req.body.permission,
      });

      //Attemt to save the new users
      User.create(newUser, (err, user) => {
        if (err) {
          console.log(newUser);
          return res.json({
            success: false,
            message: "user already exist",
            error: err,
          });
        } else {
          // create user wallet

          res.json({
            success: true,
            message: "User created.",
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
  static authenticate = (req, res) => {
    User.findOne(
      {
        // email: req.body.email,
        phoneNo: req.body.phoneNo,
      },
      function (err, user) {
        if (err) throw err;

        if (!user) {
          res.send({
            success: false,
            message: "Email or number not Correct Check and try Again",
          });
        } else {
          //Check if the password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              var token = jwt.sign({ data: user }, config.secret, {
                expiresIn: 604800, //a week
              });
              res.json({ success: true, token: "JWT " + token, user: user });
            } else {
              res.send({ success: false, message: "Password is Incorrect" });
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
  static fetchAllUsers = (req, res) => {
    User.find()
      .then((user) => {
        res.json({
          success: true,
          message: "users found",
          user: user,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: "Not Found",
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
  static updateUser = (req, res) => {
    const query = req.query;
    const userId = query.id;
    delete query.id;

    User.findByIdAndUpdate(userId, query, { new: true })
      .then((user) => {
        res.json({
          success: true,
          message: "user updated",
          user: user,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: "user not found",
          user: null,
        });
      });
  };
}

module.exports = UserController;