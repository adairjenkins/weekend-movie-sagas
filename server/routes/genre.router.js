const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// TO-DO: delete, using a single query in movie.router instead
// GET all associated genres for selected movie
// router.get('/:movieId', (req, res) => {
//   console.log('router GET genre move id:', req.params.movieId)
//   // query to get all genres
//   const query = `SELECT "movies".title, ARRAY_AGG("genres".name) FROM "movies"
//                  JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
//                  JOIN "genres" ON "genres".id = "movies_genres".genre_id
//                  GROUP BY "movies".title
//                  WHERE "movies".id = $1;`

//   pool.query(query, [req.params.movieId])
//     .then( result => {
//       console.log('result.rows:', result.rows);
//       res.send(result.rows);
//     })
//     .catch( error => {
//       console.log('server GET genres, error');
//       res.sendStatus(500);
//     })
// });

module.exports = router;