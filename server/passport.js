const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI,
},
    async function (accessToken, refreshToken, profile, done) {
        // Check if user already exists in database
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
            return done(null, existingUser);
        }

        // Create new user in database if it does not exist
        const user = await new User({
            userName: profile.displayName,
            email: profile.emails[0].value,
            password: 'your*password*is*not*stored*in*the*database',
        }).save();

        // console.log("Google Profile is: ", profile);

        done(null, user);
    }
));