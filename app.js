
// Application entry point
const express = require('express');

var app = express();

app
  .set('view engine', 'hjs')
  .get('/', (req, res) => {
    res.render('index');
  })
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
