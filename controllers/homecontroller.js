var exports = module.exports = {};

exports.home = function(req, res) {
    res.render("pages/index", {pageName : "Home", isLoggedIn : req.isAuthenticated()});
}