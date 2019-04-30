const dayjs = require('dayjs');
const relativeTime = require("dayjs/plugin/relativeTime");
const Sequelize = require("sequelize");

var models = require("../models");
var exports = module.exports = {};

dayjs.extend(relativeTime);
dayjs().format();

exports.dashboard = function(req, res) {
    models.racer.findAll({
        where: {
            user_id: req.user.id
        },
        order: [
            ['last_used', 'DESC']
        ]
    }).then(racers => {
        racers.forEach(racer => {
            racer.last_used_from_now = dayjs(racer.last_used).fromNow();
        });
        req.user.racers = racers;
        res.render("pages/dashboard", {pageName : "Dashboard", user: req.user});
    });
}

exports.register = function(req, res) {
    res.render("pages/racer_add", {pageName : "Racer registry", user: req.user});
}
