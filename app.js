// Application entry point
const express = require('express');
const session = require('express-session');
const secrets = require('./secrets');

var app = express();

app
  .set('view engine', 'hjs')
  .use(session({
    secret: secrets.session_secret,
    resave: false,
    saveUninitialized: false
  }))
  .get('/', (req, res) => {
    res.render('index');
  })
  .get('/session', (req, res) => {
    res.send(req.session);
  })
  .get('/set', (req, res) => {
    req.session.name = "Jon";
    res.redirect('/session');
  })
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
