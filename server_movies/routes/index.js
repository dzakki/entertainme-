const express = require('express');
const router = express.Router();

const Movies = require('../models/Movie');
const Tag = require('../models/Tag');
/* GET home page. */
router.get('/movies', function(req, res, next) {
  Movies
    .find()
    .populate('tags')
    .then(movies => {
      res.json(movies)
    })
    .catch(next)
});

router.get('/tags/', function (req, res, next) {  
  Tag
    .find()
    .then(tags => {
      res.json(tags)
    })
    .catch(next)
})
module.exports = router;
