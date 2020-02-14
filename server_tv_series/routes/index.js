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

router.post('/tv', function (req, res, next) {  
  const { title, overview, poster_path, popularity } = req.body
  Tv
    .create({ title, overview, poster_path, popularity, tags: ['5e45197c84f936fed373d1ee'] })
    .then(tv => {
      res.status(200).json(tv)
    })
    .catch(next)
})

router.get('/tv/:id', function (req, res, next) {  
  const { id } = req.params
  Tv
    .findOne({ _id: id })
    .then(tv => {
      res.status(200).json(tv)
    })
    .catch(next)
})

router.put('/tv/:id', function (req, res, next) {  
  const { id } = req.params
  const { title, overview, poster_path, popularity } = req.body
  Tv
    .updateOne({ _id: id }, {
      title, overview, poster_path, popularity
    })
    .then(tv => {
      return Tv.findOne({ _id: id })
    })
    .then(tv => {
      res.status(200).json(tv)
    })
    .catch(next)
})

router.delete('/tv/:id', function (req, res, next) {  
  const { id } = req.params
  Tv
    .deleteOne({_id: id})
    .then(tv => {
      res.status(200).json(tv)
    })
    .catch(next)
})

router.get('/tags/', function (req, res, next) {  
  Tag
    .find()
    .then(tags => {
      res.json(tags)
    })
    .catch(next)
})
module.exports = router;
