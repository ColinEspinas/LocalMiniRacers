const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("pages/index", {pageName : "Home"});
});

router.get("/signup", (req, res)=>{
    res.render("pages/signup", {pageName : "Sign Up"});
});

router.get("/login", (req, res)=>{
    res.render("pages/login", {pageName : "Log In"});
});

module.exports = router;