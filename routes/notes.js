const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongo = require('../db');
require('../passport');

router
  .post('/addNote', (req, res) => {
    mongo.db.collection('users').findOne({ email: req.user.email }, (err, user) => {
      let newNote = {
        posterEmail: user.email,
        note: req.body.note
      }
      mongo.db.collection('notes').insertOne(newNote, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  })

  .delete('/deleteNote', (req, res) => {
    mongo.db.collection('notes').deleteOne({ posterEmail: req.user.email, note: req.body.noteToDelete }, (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  })

  .get('/notes', (req, res) => {
    if (req.isAuthenticated()) {
      mongo.db.collection('notes').find({ posterEmail: req.user.email }).toArray((err, result) => {
        if (err) throw err;
        res.render('notes', { notes: result });
      });
    }else {
      res.redirect('/');
    }
  });


module.exports = router;
