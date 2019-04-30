const Sequelize = require("sequelize");

var models = require("../models");
var exports = module.exports = {};

exports.register = function (req, res) {
    models.racer.findOne({
        where: { id: req.body.racerid }
    }).then(function (racer) {
        if (racer) {
            req.flash('error', 'That racer is already registered to your or another account.');
            res.redirect("/dashboard/register");
        } else {

            var data = {
                id: req.body.racerid, 
                name: req.body.racername, 
                user_id: req.user.id, 
                use_count: 0, 
                last_used: new Date(),
            }

            models.racer.create(data).then(function(newRacer, created) {
                if (!newRacer) {
                    req.flash('error', 'Error when adding the racer to database.');
                    res.redirect("/dashboard/register");
                }
                if (newRacer) {
                    res.redirect("/dashboard");
                }
            });
        }
    });
}