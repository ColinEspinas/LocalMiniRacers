var exports = module.exports = {};

exports.signup = function(req, res) {
    res.render("pages/signup", {pageName : "Sign Up"});
}
 
exports.login = function(req, res) {
    res.render("pages/login", {pageName : "Log In"});
}
 
 
exports.dashboard = function(req, res) {
    res.render("pages/dashboard", {pageName : "Dashboard"});
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}