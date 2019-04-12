const express = require('express');
const router = express.Router();
const authController = require("../controllers/authcontroller");

router.get("/", (req, res)=>{
    res.render("pages/index", {pageName : "Home"});
});

module.exports = router;