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
            <h2>{movieDetails.title}</h2>
            <img src={movieDetails.poster}/>
            <p>{movieDetails.description}</p>
            <h5>Genres:</h5>
            <ul>
                {genres.map( genre => {
                    return (
                        <p>{genre}</p>
                    )
                })}
            </ul>
        </>
    )
}

export default Details;