import './App.css';
import Search from './components/Search/Search.js'
import NavBar from './components/NavBar/NavBar.js'
import Home from './components/Home/Home.js'
import Login from './components/Login/Login.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </div>
    </Router>
  );
}

export default App;
