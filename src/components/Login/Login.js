import axios from 'axios';
import { useContext, useState } from 'react';
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router';
import { UserContext } from '../../UserContext.js'
import Error from '../FlashMessages/Error.js';

const Login = () => {
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()
  const [openError, setOpenError] = useState(false)
  
  const handleLogin = async googleData => {
    const res = await axios({
      method: 'post',
      url: process.env.REACT_APP_AUTH_GOOGLE_URL,
      data: {
        token: googleData.tokenId
      }
    })
    const data = await res.data
    setUser(data)
    history.push('/dashboard')
  }

  const handleFailedLogin = () => {
    toggleError()
  }

  const toggleError = () => {
    openError ? setOpenError(false) : setOpenError(true)
  }
  
  return ( 
    <div>
      <Error open={openError} toggleError={toggleError} />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailedLogin}
        cookiePolicy={'single_host_origin'}
      />
    </div>
   )
}
 
export default Login