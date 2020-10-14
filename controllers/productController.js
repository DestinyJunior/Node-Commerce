var Bank = require("../models/product");

class BankController {
  /**
   * Create new Bank
   * @param {*} req  Request
   * @param {*} res Response
   * @param {*} next
   */
  static createBankDetails = (req, res, next) => {
    // validate request
    if (!req.body.name && req.body.accountNumber && req.body.bvn) {
      return res.json({
        success: false,
        message: "provide name,  accountNumber,  bvn.",
      });
    } else {
      // Bank.findOne(
      //   {
      //     userId: req.user._id,
      //   },
      //   (err, bank) => {
      //   }
      // );
      // save new bank details
      let bankDetails = new Bank({
        userId: req.user._id,
        name: req.body.name,
        accountNumber: req.body.accountNumber,
        bvn: req.body.bvn,
      });

      // attempt to save new user bank details
      Bank.create(bankDetails, (err, bank) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: err,
          });
        } else {
          return res.json({
            success: true,
            message: "created",
            bank: bank,
          });
        }
      });
    }
  };

  /**
   * get Bank by id
   * @param {*} req Request
   * @param {*} res Response
   */
  static getBankDetails = (req, res) => {
    Bank.find()
      .then((banks) => {
        return res.json({
          success: true,
          message: "bank details found.",
          banks: banks,
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: "Not Found.",
          banks: null,
          error: err,
        });
      });
  };

  /**
   * get User Bank
   * @param {*} req Request
   * @param {*} res Response
   */
  static getUserBank = (req, res) => {
    Bank.find({ userId: req.user._id })
      .then((bank) => {
        return res.json({
          success: true,
          message: "bank details found.",
          bank: bank,
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: "Not Found.",
          bank: null,
          error: err,
        });
      });
  };
}

module.exports = BankController;
