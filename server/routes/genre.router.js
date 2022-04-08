const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET all associated genres for selected movie
router.get('/:movieId', (req, res) => {
  console.log('router GET genre move id:', req.params.movieId)
  // query to get all genres

  res.sendStatus(500)
});

module.exports = router;