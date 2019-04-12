const express = require('express');
const passport = require('passport');

var models = require("../models");
require('../config/passport/passport')(passport, models.user);

const router = express.Router();
const authController = require("../controllers/authcontroller");

// Routes :
router.get("/signup", authController.signup);

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

router.get("/login", authController.login);

router.get('/logout', authController.logout);





module.exports = router;