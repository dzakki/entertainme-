const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/entertainme', function(req, res, next) {
  const movies = []
  const tv = []
  axios
    .get('http://localhost:3001/movies')
    .then(({data}) => {
      console.log(data)
      movies.push(...data)
      return axios.get('http://localhost:3002/tv')
    })
    .then(({data}) => {
      tv.push(...data)
      res.json({
        movies,
        tvSeries: tv
      })
    })
    .catch(next)
});

module.exports = router;
