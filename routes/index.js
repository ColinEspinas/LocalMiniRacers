const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("pages/index", {pageName : "Home"});
});

router.get("/signup", (req, res)=>{
    res.render("pages/signup", {pageName : "Sign Up"});
});

module.exports = router;