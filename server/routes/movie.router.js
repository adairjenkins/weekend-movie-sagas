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

  const query = `SELECT "movies".id, "movies".title, "movies".poster, "movies".description, ARRAY_AGG("genres".name) AS "genres" FROM "movies"
                 JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
                 JOIN "genres" ON "genres".id = "movies_genres".genre_id
                 WHERE "movies".id = $1
                 GROUP BY "movies".id;`;

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
  console.log('req.body:', req.body);
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

// PUT request -> updates database with edited movie data
router.put('/:movieId', (req, res) => {
  const id = req.params.movieId;
  const movie = req.body;
  console.log('id & movie:', id, movie);
  
  const query = `UPDATE "movies"
                 SET "title" = $1,
                     "poster" = $2,
                     "description" = $3
                 WHERE "id" = $4;
  `;
  const values = [movie.title, movie.poster, movie.description, id];

  pool.query(query, values)
  .then( result => {
    res.sendStatus(201);
  })
  .catch( error => {
    console.log('server PUT', error)
    res.sendStatus(500);
  })
});

module.exports = router;