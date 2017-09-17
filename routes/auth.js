const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

router
  .post('/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/'
  }))
  .post('/register', passport.authenticate('local-register', {
    successRedirect: '/notes',
    failureRedirect: '/'
  }))
  .post('/logout', (req, res) => {
    req.session.destroy((err) => {
      res.sendStatus(200);
    });
  });

module.exports = router;
