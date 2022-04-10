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
        <Grid container spacing={1}>
            <Grid container item xs={12} sm={8} md={8} lg={8} >
                <Card raised={true}>
                    <Grid container item xs={5} sm={5} md={5} lg={5}>
                        <CardMedia
                            className="posterDetail"
                            component="img"
                            image={movieDetails.poster}
                            alt={movieDetails.title}
                            // height="400"
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
                            <HomeIcon fontSize="large" onClick={returnHome} sx={{ cursor: 'pointer' }}/>
                            <EditIcon fontSize="large"/>
                        </CardActions>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Details;