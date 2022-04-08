import { useSelector } from 'react-redux';

function Details() {
    const movieDetails = useSelector(store => store.movies[0]);
    console.log('movieDetails:', movieDetails);

    let genres = [];
    if (movieDetails.genres) {
        genres = movieDetails.genres;
    }

    
    return (
        <>
            <p>{movieDetails.title}</p>
            <img src={movieDetails.poster}/>
            <p>{movieDetails.description}</p>
            <h3>Genres:</h3>
            <ul>
                {genres.map( genre => {
                    return (
                        <li>{genre}</li>
                    )
                })}
            </ul>
        </>
    )
}

export default Details;