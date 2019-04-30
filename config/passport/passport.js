const bCrypt = require("bcrypt-nodejs");
const Sequelize = require("sequelize");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'usermail',
            passwordField: 'userpass',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({ where: {[Sequelize.Op.or]: [{username: {[Sequelize.Op.eq]: req.body.username}}, {email: {[Sequelize.Op.eq]: email}}]}}).then(function(user) {
            
                if (user) {
                    return done(null, false, {
                        message: 'That email or username is already taken'
                    });
            
                } else {
            
                    var userPassword = generateHash(password);
            
                    var data =
            
                        {
                            username: req.body.username,

                            email: email,
            
                            password: userPassword,
            
                        };
            
                    User.create(data).then(function(newUser, created) {
            
                        if (!newUser) {
            
                            return done(null, false);
            
                        }
            
                        if (newUser) {
            
                            return done(null, newUser);
            
                        }
            
                    });
            
                }
            
            });
        }
    ));

    passport.use('local-login', new LocalStrategy(
 
        {
     
            usernameField: 'username',
     
            passwordField: 'userpass',
     
            passReqToCallback: true
     
        },
     
     
        function(req, username, password, done) {
     
            var User = user;
     
            var isValidPassword = function(userpass, password) {
     
                return bCrypt.compareSync(password, userpass);
     
            }
     
            User.findOne({
                where: {
                    [Sequelize.Op.or]: [{username: {[Sequelize.Op.eq]: username}}, {email: {[Sequelize.Op.eq]: username}}]
                }
            }).then(function(user) {
     
                if (!user) {
     
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
     
                }
     
                if (!isValidPassword(user.password, password)) {
     
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
     
                }
                var datetime = new Date();
                User.update({last_login : datetime}, { where: {id: user.id} });
                var userinfo = user.get();
                return done(null, userinfo);
     
            }).catch(function(err) {
     
                console.log("Error:", err);
     
                return done(null, false, {
                    message: 'Something went wrong with your Login'
                });
     
            });
     
     
        }
     
    ));

    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });

    passport.deserializeUser(function(id, done) {
 
        User.findByPk(id).then(function(user) {
     
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
     
        });
     
    });
}