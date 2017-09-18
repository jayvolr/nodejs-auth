const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('./db');
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

passport.use(new LocalStrategy(authenticate));
passport.use("local-register", new LocalStrategy({
  passReqToCallback: true
}, register))

function authenticate(email, password, done) {
  mongo.db.collection('users')
  .findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect email or password." });

    bcrypt.compare(password, user.password, (err, passwordMatches) => {
      if (passwordMatches === false) {
        return done(null, false, { message: "Incorrect email or password." });
      }
    });

    return done(null, user);
  });
}

function register(req, email, password, done) {
  if (req.body.password2 !== password) {
    return done(null, false, { message: "Passwords do not match." });
  }

  mongo.db.collection('users')
  .findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (user) {
      return done(null, false, { message: "User with that email already exists." });
    }

    bcrypt.hash(password, 8, (err, hashedPassword) => {
      if (err) return done(err);
      const newUser = {
        email: email,
        password: hashedPassword,
        joinDate: new Date()
      }

      mongo.db.collection('users')
      .insert(newUser, (err, result) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    });
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
