import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, CardMedia, Typography } from '@material-ui/core';
import { CardActionArea } from '@mui/material';

function MovieCard({movie}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDetails = (movie) => {
        console.log('handleDetails func:', movie.title)
        dispatch({type: 'GET_DETAILS', payload: movie.id});
        history.push('/details');
    }
    
    return (
        <Card raised={true} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={movie.poster}
                    alt={movie.title}
                    onClick={ () => handleDetails(movie)}
                    />
                < CardContent>
                    <Typography>
                        {movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MovieCard;