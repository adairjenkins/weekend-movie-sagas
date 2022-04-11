import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2';

function EditMovie() {
    const id = useParams().id;
    
    useEffect(() => {
        dispatch({type: 'GET_DETAILS', payload: id});
    }, []);

    const movieDetails = useSelector(store => store.detailsReducer);
    console.log('movieDetails:', movieDetails);

    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(movieDetails.title);
    const [url, setUrl] = useState(movieDetails.poster);
    const [description, setDescription] = useState(movieDetails.description);
    const [genreId, setGenreId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('title:', title);

        const editedMovie = {
            title: title,
            poster: url,
            description: description,
            genre_id: genreId
        }
        console.log('handleSubmit func newMovie:', editedMovie);
        dispatch({type: 'EDIT_MOVIE', payload: {id: id, movie: editedMovie}});
        setTitle('');
        setUrl('');
        setDescription('');
        setGenreId('')

        Swal.fire('Movie added to database')
        returnHome();
    }

    const returnHome = () => {
        console.log('returnHome func');
        history.push('/');
    }
    
    return (
        <>
        <Container maxWidth="sm">
            <Typography variant="h5">
                Edit Movie
            </Typography>
        <form onSubmit={handleSubmit}>
            <TextField label="Title" variant="filled" value={title} sx={{ minWidth: 400 }} onChange={(event) => setTitle(event.target.value)}>
                <FilledInput id="title"/>
            </TextField>
            <FormControl>
            <TextField label="Description" value={description} multiline variant="filled" sx={{ minWidth: 600 }} onChange={(event) => setDescription(event.target.value)}>
                <FilledInput/>
            </TextField>
            </FormControl>
            <TextField label="Poster URL" variant="filled" sx={{ minWidth: 600 }} value={url} onChange={(event) => setUrl(event.target.value)}>
                <FilledInput/>
            </TextField>
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="select-genre">Genre</InputLabel>
                <Select
                labelId="select-genre"
                value={genreId}
                label="Genre"
                variant="filled"
                onChange={(event) => setGenreId(event.target.value)}
                >
                    <MenuItem value={1}>Adventure</MenuItem>
                    <MenuItem value={2}>Animated</MenuItem>
                    <MenuItem value={3}>Biographical</MenuItem>
                    <MenuItem value={4}>Comedy</MenuItem>
                    <MenuItem value={5}>Disaster</MenuItem>
                    <MenuItem value={6}>Drama</MenuItem>
                    <MenuItem value={7}>Epic</MenuItem>
                    <MenuItem value={8}>Fantasy</MenuItem>
                    <MenuItem value={9}>Musical</MenuItem>
                    <MenuItem value={10}>Romantic</MenuItem>
                    <MenuItem value={11}>Science Fiction</MenuItem>
                    <MenuItem value={12}>Space-Opera</MenuItem>
                    <MenuItem value={13}>Superhero</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit">
                    Submit changes
            </Button>
            <Button onClick={returnHome}>
                <HomeIcon fontSize="large" sx={{ cursor: 'pointer' }}/>
            </Button>
        </form>
        </Container>
        </>
    )
}

export default EditMovie;