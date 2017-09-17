const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

router
  .post('/login', passport.authenticate('local', {
    successRedirect: '/session',
    failureRedirect: 'back'
  }))
  .post('/register', passport.authenticate('local-register', {
    successRedirect: '/session',
    failureRedirect: 'back'
  }));

module.exports = router;
