const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GETs all movies from database
router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    })

});

// TO-DO : GETs details for selected movie
router.get('/details/:movieId', (req, res) => {
  console.log('movie.router details GET movieId:', req.params.movieId);

  const query = `SELECT * FROM "movies"
                 WHERE "id" = $1;`
  pool.query(query, [req.params.movieId])
    .then( result => {
      res.send(result.rows);
    })
    .catch( error => {
      console.log('server GET movie details', error)
      res.sendStatus(500);
    })
});

// POST request -> adds a new movie to "movies" and "movies_genres" tables in database
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;