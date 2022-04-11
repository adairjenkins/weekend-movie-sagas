import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_DETAILS', getDetails);
    // yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('EDIT_MOVIE', editMovie);
}

// PUT
function* editMovie(action) {
    const movieId = action.payload.id;
    const movie = action.payload.movie;
    console.log('saga editMovie id & movie:', movieId, movie);

    try {
        yield axios.put(`/api/movie/${movieId}`, movie)
        yield put({type: 'FETCH_MOVIES'})
    } catch {
        console.log('error in saga editMovie');
    }
}

// POST
function* addMovie(action) {
    console.log('saga addMovie func action.payload:', action.payload);
    try {
        yield axios.post('/api/movie', action.payload)
        yield put({type: 'FETCH_MOVIES'})
    } catch {
        console.log('POST error in saga addMovie');
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* getDetails(action) {
    const movieId = action.payload;
    console.log('saga getDetails func movieId:', movieId);
    try {
        let response = yield axios.get(`/api/movie/details/${movieId}`)
        console.log('response.data in saga getDetails:', response.data[0]);
        yield put({type: 'SET_DETAILS', payload: response.data[0]});
    } catch {
        console.log('error in saga getDetails');
    }
}

// TO-DO: delete at end, using a single query instead
// function* getGenres(action) {
//     const movieId = action.payload;
//     console.log('saga getGenres func movieId:', movieId);
//     try {
//         let response = yield axios.get(`/api/genre/${movieId}`)
//         console.log('response.data in saga getGenres:', response.data);
//         // yield put({type: 'SET_GENRES', payload: response.data});
//     } catch {
//         console.log('error in saga getGenres');
//     }
// }

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// REDUCER - used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        // case 'SET_DETAILS':
        //     console.log('SET_DETAILS action.payload:', action.payload);
        //     return action.payload;
        default:
            return state;
    }
}

const detailsReducer = (state = {}, action) => {
    if (action.type === 'SET_DETAILS') {
        console.log('SET_DETAILS action.payload:', action.payload);
        return action.payload;
    } else {
        console.log('else condition in detailsReducer');
        return state;
    }
}

// Used to store the movie genres
// TO-DO: delete at end, using a single query instead
// const genres = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_GENRES':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        detailsReducer
        // genres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
