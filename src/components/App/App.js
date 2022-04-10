import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieForm from '../MovieForm/MovieForm';
import Details from '../Details/Details';

function App() {
  return (
    <div className="App">
      <Router>        
        <Route path="/" exact>
          < MovieForm/>
          < MovieList/>
        </Route>
        
        {/* Details page */}
        <Route path="/details">
          <Details/>
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
