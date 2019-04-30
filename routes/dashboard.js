const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middlewares/authverification');

var models = require("../models");
require('../config/passport/passport')(passport, models.user);

const router = express.Router();
const dashboardController = require("../controllers/dashboardcontroller");
const racerController = require("../controllers/racercontroller");

// Routes :
router.get("/", isLoggedIn, dashboardController.dashboard);
router.get("/register", isLoggedIn, dashboardController.register);
router.post("/register", isLoggedIn, racerController.register);





module.exports = router;