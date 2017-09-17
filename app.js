// Application entry point
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const secrets = require('./secrets');
const mongo = require('./db');

var app = express();

app
  .set('view engine', 'hjs')
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(session({
    store: new RedisStore(),
    secret: secrets.session_secret,
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/notes');
    }else {
      res.render('index');
    }
  })
  .get('/session', (req, res) => {
    res.send(req.session);
  })
  .use(require('./routes/auth'))
  .use(require('./routes/notes'))
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
