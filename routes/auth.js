const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../passport');

router
  .post('/login', passport.authenticate('local', {
    successRedirect: '/session',
    failureRedirect: 'back'
  }));

module.exports = router;
