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
    req.session.user = req.user;
    req.session.isAuthenticated = req.isAuthenticated();
    res.send(req.session);
  })
  .get('/set', (req, res) => {
    req.session.name = "Jon";
    res.redirect('/session');
  })
  .get('/db', (req, res) => {
    mongo.db.collection('users')
      .find()
      .toArray((err, users) => {
        if (err) throw err;
        res.send(users);
      });
  })
  .use(require('./routes/auth'))
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
