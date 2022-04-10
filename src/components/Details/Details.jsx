import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';

function Details() {
    const history = useHistory();
    const movieDetails = useSelector(store => store.movies[0]);
    console.log('movieDetails:', movieDetails);

    let genres = [];
    if (movieDetails.genres) {
        genres = movieDetails.genres;
    }

    const returnHome = () => {
        console.log('returnHome func');
        history.push('/');
    }
    
    return (
        <Container>
            <Card variant="outlined">
                <Grid container>
                    <Grid item>
                        <CardMedia
                            component="img"
                            image={movieDetails.poster}
                            alt={movieDetails.title}
                        />
                    </Grid>
                    <Grid item>
                        <CardContent>   
                            <Typography variant="h4">
                                {movieDetails.title}
                            </Typography>
                            <Typography>
                                {movieDetails.description}
                            </Typography>
                            <Typography variant="h6">
                                Genres:
                                    <span>{genres.map( genre => {
                                        return (" " + genre)
                                    })}
                                    </span>
                            </Typography>
                        </CardContent> 
                    </Grid>
                    <Grid item>
                        <CardActions >
                            <HomeIcon fontSize="large" onClick={returnHome}/>
                            <EditIcon fontSize="large"/>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Details;