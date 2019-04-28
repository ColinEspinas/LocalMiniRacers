const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middlewares/authverification');

var models = require("../models");
require('../config/passport/passport')(passport, models.user);

const router = express.Router();
const dashboardController = require("../controllers/dashboardcontroller");

// Routes :
router.get("/", isLoggedIn, dashboardController.dashboard);





module.exports = router;