const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");
const Tag = require("../models/Tag");
router.get("/movies", function(req, res, next) {
  Movie.find()
    .populate("tags")
    .then(movies => {
      res.json(movies);
    })
    .catch(next);
});

router.post("/movies", function(req, res, next) {
  const { title, overview, poster_path, popularity, tags } = req.body;
  Movie.create({
    title,
    overview,
    poster_path,
    popularity,
    tags
  })
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(next);
});

router.get("/movies/:id", function(req, res, next) {
  const { id } = req.params;
  Movie.findOne({ _id: id })
    .populate("tags")
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(next);
});

router.put("/movies/:id", function(req, res, next) {
  const { id } = req.params;
  const { title, overview, poster_path, popularity, tags } = req.body;
  Movie.updateOne(
    { _id: id },
    {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  )
    .then(movie => {
      return Movie.findOne({ _id: id });
    })
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(next);
});

router.delete("/movies/:id", function(req, res, next) {
  const { id } = req.params;
  Movie.deleteOne({ _id: id })
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(next);
});

router.get("/tags/", function(req, res, next) {
  Tag.find()
    .then(tags => {
      res.json(tags);
    })
    .catch(next);
});
module.exports = router;
