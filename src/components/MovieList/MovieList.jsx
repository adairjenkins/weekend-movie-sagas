import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleAddMovie = () => {
        console.log('handleAddMovie func');
        history.push('/add-movie');
    }

    return (
        <main>
            <Container >
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <AddRoundedIcon onClick={handleAddMovie} sx={{ cursor: 'pointer', fontSize: 50 }}/>
                    </Grid>
                    {movies.map(movie => (
                        <Grid key={movie.id} item xs={6} sm={4} md={3} lg={3}>
                            < MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>

    );
}

export default MovieList;