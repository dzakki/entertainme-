const express = require('express');
const router = express.Router();

const Tv = require('../models/Tv');
const Tag = require('../models/Tag');
/* GET home page. */
router.get('/tv', function(req, res, next) {
  Tv
    .find()
    .populate('tags')
    .then(tvs => {
      res.json(tvs)
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
