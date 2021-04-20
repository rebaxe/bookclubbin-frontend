import './App.css';
import Search from './components/Search/Search.js'
import NavBar from './components/NavBar/NavBar.js'
import Home from './components/Home/Home.js'
import Login from './components/Login/Login.js'
import Dashboard from './components/Dashboard/Dashboard.js'
import { UserProvider } from './UserContext.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Logout from './components/Logout/Logout';
import ProtectedRoute from './Routes/ProtectedRoute';


function App() {
  return (
      <Router>
        <UserProvider>
          <div className="App">
            <NavBar />
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <ProtectedRoute exact path="/search" component={Search} />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </UserProvider>
      </Router>
    
  )
}

export default App;
