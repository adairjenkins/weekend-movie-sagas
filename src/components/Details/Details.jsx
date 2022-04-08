import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Details() {
    const movieDetails = useSelector(store => store.movies[0]);
    console.log('movieDetails:', movieDetails);

    let genres = [];
    if (movieDetails.genres) {
        genres = movieDetails.genres;
    }

    
    return (
        <>
            <h2>{movieDetails.title}</h2>
            <img src={movieDetails.poster}/>
            <p>{movieDetails.description}</p>
            <h5>Genres:</h5>
            <div>
                {genres.map( genre => {
                    return <p>{genre}</p>
                })}
            </div>
            <Link to="/">Back to movie list</Link>
        </>
    )
}

export default Details;