const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//using the relative url means we don't have to worry about the domain that we have to send the user back to
//it is the google strategy that is deciding which domain to add to the callbackURL whether it be local host or
//production url so in development it is appending 'localhost:5000' but in heroku it will incorrectly redirect to
// 'http://nameOfDomain/auth/google/callback' instead of https://nameOfDomain/auth/google/callback due to the heroku proxy
//to fix it we could add the absolute path using https: || just add `proxy: true` which is telling google to trust the proxy
// and calculate the callbackURL correctly
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record
          done(null, existingUser);
        } else {
          //we don't have a record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
