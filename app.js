// Application entry point
const express = require('express');

var app = express();

app
  .set('view engine', 'hjs')
  .use(express.static(__dirname + '/public'))
  .get('/', (req, res) => {
    res.render('index');
  })
  .post('/login', (req, res) => {
    console.log(req.body);
  })
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
