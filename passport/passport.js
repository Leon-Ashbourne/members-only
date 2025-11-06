const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const query = require("../models/query");
const compare = require("bcryptjs").compare;

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {    
            const rows = await query.userGet( username );
            const user = rows[0];

            if(!user) return done(null, false, {message: "username is incorrect"});
            
            const hashedPassword = rows[0].password;
            const isMatched = compare(password, hashedPassword);

            if(!isMatched) return done(null, false, {message: "password is incorrect"});

            done(null, user);
        } catch(err) {
            done(err);
        }
    }
))

passport.serializeUser(
    (user, done) => {
        return done(null, user.id);
    }
)

passport.deserializeUser(
    async (userId, done) => {

        try {
            const rows = await query.userByIdGet(userId);
            const user = rows[0];
            done(null, user);
        } catch(err) {
            done(err);
        }
    }
)


module.exports = passport;