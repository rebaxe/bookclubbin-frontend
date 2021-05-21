import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './components/Search/Search'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import { UserProvider } from './UserContext'
import Logout from './components/Logout/Logout'
import ProtectedRoute from './Routes/ProtectedRoute'
import CreateClub from './components/Club/CreateClub'
import { ClubsProvider } from './ClubsContext'
import NotFound from './pages/NotFound/NotFound'
import BookClub from './pages/BookClub/BookClub'

function App() {
  return (
    <Router>
      <UserProvider>
        <ClubsProvider>
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
              <ProtectedRoute exact path="/logout" component={Logout} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/create-club" component={CreateClub} />
              <ProtectedRoute exact path="/bookclubs/:id" component={BookClub} />
              <ProtectedRoute exact path="/user/delete" />
              <Route component={NotFound} />
            </Switch>
          </div>
        </ClubsProvider>
      </UserProvider>
    </Router>
  )
}

export default App
