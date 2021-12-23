const LocatStrategy = require('passport-local').Strategy;
const connect = require('../lib/database.js');

module.exports = function(passport){
    
    passport.use(
        'signin-check',
        new LocatStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            console.log('passport')
        })
    )
    
}