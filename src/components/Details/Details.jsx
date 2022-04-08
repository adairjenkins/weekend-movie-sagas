import { useSelector } from 'react-redux';

function Details() {
    const movieDetails = useSelector(store => store.movies[0]);
    console.log('movieDetails:', movieDetails);
    
    return (
        <>
            <p>details component</p>
            <p>{movieDetails.title}</p>
            <img src={movieDetails.poster}/>
            <p>{movieDetails.description}</p>
        </>
    )
}

export default Details;