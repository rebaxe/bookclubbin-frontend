import { useContext } from 'react'
import { GoogleLogout } from 'react-google-login'
import { useHistory } from 'react-router'
import { UserContext } from '../../UserContext'

const Logout = () => {
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()
  console.log(user)

  const handleLogout = () => {
    // localStorage.removeItem('accessToken')
    setUser(null)
    history.push('/')
  }
  return ( 
    <GoogleLogout 
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={handleLogout}
    />
   )
}
 
export default Logout