const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
    const { id, displayName, emails } = profile;
    try {
        let user = await User.findOne({ email: emails[0].value });
        if (!user) {
            user = new User({ name: displayName, email: emails[0].value, provider: 'google' });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Add similar strategies for Facebook, Twitter, and GitHub

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
