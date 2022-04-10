import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, CardMedia, Typography } from '@material-ui/core';
import { CardActionArea } from '@mui/material';
import { sizing } from '@mui/system';

function MovieCard({movie}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDetails = (movie) => {
        console.log('handleDetails func:', movie.title)
        dispatch({type: 'GET_DETAILS', payload: movie.id});
        history.push('/details');
    }

    const cardStyle = {

        // height: "45vw"
        width: 300,
        height: 500
      };
    
    return (
        <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    // width="50%"
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