import { useSelector } from 'react-redux';

function Details() {
    const movieDetails = useSelector(store => store.movies[0]);
    console.log('movieDetails:', movieDetails);
    
    
    return (
        <>
            <p>{movieDetails.title}</p>
            <img src={movieDetails.poster}/>
            <p>{movieDetails.description}</p>
            <h3>Genres:</h3>
            <ul>

            </ul>
        </>
    )
}

export default Details;