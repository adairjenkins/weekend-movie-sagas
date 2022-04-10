import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

function EditMovie() {
    const id = useParams().id;

    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [genreId, setGenreId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('title:', title);

        const newMovie = {
            title: title,
            poster: url,
            description: description,
            genre_id: genreId
        }
        console.log('handleSubmit func newMovie:', newMovie);
        dispatch({type: 'ADD_MOVIE', payload: newMovie});
        setTitle('');
        setUrl('');
        setDescription('');
        setGenreId('')
        // returnHome();
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
            <TextField label="Title" required variant="filled" value={title} sx={{ minWidth: 400 }} onChange={(event) => setTitle(event.target.value)}>
                <FilledInput id="title"/>
            </TextField>
            <FormControl>
            <TextField label="Description" value={description} required multiline variant="filled" sx={{ minWidth: 600 }} onChange={(event) => setDescription(event.target.value)}>
                <FilledInput/>
            </TextField>
            </FormControl>
            <TextField label="Poster URL" required variant="filled" sx={{ minWidth: 600 }} value={url} onChange={(event) => setUrl(event.target.value)}>
                <FilledInput/>
            </TextField>
            <FormControl sx={{ minWidth: 200 }} required>
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