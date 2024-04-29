const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = function(passport) {
    // Local Strategy for username and password login
    passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        // Match user
        User.findOne({ username: username.toLowerCase() })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'That username is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
            .catch(err => done(err));
    }));

    // Serialize user into the sessions
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from the sessions
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
