// Application entry point
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const secrets = require('./secrets');
const mongo = require('./db');

var app = express();

app
  .set('view engine', 'hjs')
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(session({
    secret: secrets.session_secret,
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .get('/', (req, res) => {
    res.render('index');
  })
  .get('/session', (req, res) => {
    res.send(req.session);
  })
  .use(require('./routes/auth'))
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
