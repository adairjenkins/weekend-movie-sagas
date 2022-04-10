import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie';
import Details from '../Details/Details';

function App() {
  return (
    <div className="App">
      <Router>        
        <Route path="/" exact>
          < MovieList/>
        </Route>
        <Route path="/details">
          <Details/>
        </Route>
        <Route path="/add-movie">
          < AddMovie/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
