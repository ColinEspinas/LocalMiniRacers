var exports = module.exports = {};

exports.dashboard = function(req, res) {
    res.render("pages/dashboard", {pageName : "Dashboard", user: req.user});
}
