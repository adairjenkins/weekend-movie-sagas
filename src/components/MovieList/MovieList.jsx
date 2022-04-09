import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './MovieList.css'

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
            <Grid container className="movies">
                    {movies.map(movie => {
                        return (
                            <Grid item key={movie.id} >
                                <Paper>
                                    <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} onClick={ () => handleDetails(movie)}/>
                                </Paper>
                            </Grid>
                        );
                    })}
            </Grid>
        </main>

    );
}

export default MovieList;