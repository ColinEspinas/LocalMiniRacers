const bCrypt = require("bcrypt-nodejs");

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

            User.findOne({ where: { email: email }}).then(function(user) {
            
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
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
    ))

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