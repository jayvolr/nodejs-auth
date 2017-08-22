const LocalStrategy = require('passport-local').Strategy;
const mongo = require('./db');
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

passport.use(new LocalStrategy(authenticate));

function authenticate(email, password, done) {
  mongo.db.collection('users')
    .findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user || password !== user.password) {
        return done(null, false, { message: "Incorrect email or password." });
      }
      return done(null, user);
    });
}

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  mongo.db.collection('users')
    .findOne({ _id: new ObjectID(id) }, (err, user) => {
      done(err, user);
    });
});
