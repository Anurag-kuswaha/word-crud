var express = require('express');
var router = express.Router();
var wordsDB = require('../models/words')
/* GET home page. */

router.get('/', async function (req, res, next) {
  var allWords = await wordsDB.find().lean();
  console.log(allWords);
  res.statusCode = 200;
  res.render('homepage', { 'Words': allWords });
});

/* GET all word.- Deprecated */
router.get('/getAll', async function (req, res, next) {
  var allWords = await wordsDB.find();
  console.log(allWords);
  res.statusCode = 200;
  if (allWords.length > 0) {
    res.json(allWords);
  } else {
    res.json(`No record Found in DB`);
  }
});

/*  add word. */
router.post('/add', async function (req, res, next) {
  var clientWord = req.body.word;
  if (clientWord) {
    var result = await wordsDB.find({ 'word': clientWord });
    if (result.length > 0) {
      // word exist;
      return res.json({ success: false, message: 'data is alreday in the database' });
    }
    else {
      //add
      var serverResult = new wordsDB({ 'word': clientWord });
      serverResult
        .save()
        .then(async (word) => {
          console.log(word);
          res.statusCode = 200;
          let allWords = await wordsDB.find().lean();
          return res.json({ success: true, message: `word Successfully added in the Database`, data: allWords });
        })
        .catch((e) => {
          console.log(e);
          res.statusCode = 400;
          return res.json({ success: false, message: 'some error occured in DB' });
        });
    }
  }
  else return res.json({ success: false, message: 'no input given' });
});

/*  update word. */
router.post('/update', async function (req, res, next) {
  var clientWord = req.body.word;
  var clientNewWord = req.body.newWord;
  if (clientWord && clientNewWord) {
    var result = await wordsDB.find({ 'word': clientWord });
    if (result.length > 0) {
      // word exist;
      //add
      var serverResult = wordsDB.updateOne({ 'word': clientWord }, { 'word': clientNewWord });
      serverResult
        .then(async (word) => {
          console.log(word);
          res.statusCode = 200;
          let allWords = await wordsDB.find().lean();
          return res.json({ success: true, message: `word Successfully added in the Database`, data: allWords });
        })
        .catch((e) => {
          console.log(e);
          res.statusCode = 400;
          return res.json({ success: false, message: 'some error occured in DB' });
        });

    }
    else {
      return res.json({ success: false, message: 'word is not in the database' });
    }
  }
  else return res.json({ success: false, message: 'no input given' });

});

/*  delete word. */
router.post('/delete', async function (req, res, next) {
  var clientWord = req.body.word;
  if (clientWord) {
    var result = await wordsDB.find({ 'word': clientWord });
    if (result.length > 0) {
      // word exist;
      //add
      var serverResult = wordsDB.deleteOne({ 'word': clientWord });
      serverResult
        .then(async (word) => {
          console.log(word);
          res.statusCode = 200;
          let allWords = await wordsDB.find().lean();
          return res.json({ success: true, message: `word Successfully deleted from the Database`, data: allWords });
        })
        .catch((e) => {
          console.log(e);
          res.statusCode = 400;
          return res.json({ success: false, message: 'some error occured in DB' });
        });

    }
    else {
      return res.json({ success: false, message: 'word is not in the database' });
    }
  }
  else return res.json({ success: false, message: 'no input given' });
});


module.exports = router;
