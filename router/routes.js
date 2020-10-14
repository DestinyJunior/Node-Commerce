var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
var express = require('express');

// controllers
var balanceController = require('../controllers/balance_controller');

// initialize api group
var balanceRequests = express.Router();

balanceRequests.post('/', balanceController.createBalance);
