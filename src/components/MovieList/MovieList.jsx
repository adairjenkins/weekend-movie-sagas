import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
import { Paper , Grid, Container, Card } from '@material-ui/core';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleDetails = (movie) => {
        console.log('handleDetails func:', movie.title)
        dispatch({type: 'GET_DETAILS', payload: movie.id});
        history.push('/details');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <Container>
            <Grid container className="movies">
                    {movies.map(movie => {
                        return (
                            < MovieCard
                              movie={movie}
                            />
                        );
                    })}
            </Grid>
            </Container>
        </main>

    );
}

export default MovieList;