import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <Container >
                <h1>MovieList</h1>
                <Grid container className="movies">
                        {movies.map(movie => (
                            <Grid key={movie.id}>
                                < MovieCard movie={movie} />
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </main>

    );
}

export default MovieList;