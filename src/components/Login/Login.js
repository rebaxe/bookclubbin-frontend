import axios from 'axios';
import GoogleLogin from 'react-google-login'

const Login = () => {
  const handleLogin = async googleData => {
    const res = await axios({
      method: 'post',
      url: process.env.REACT_APP_AUTH_GOOGLE_URL,
      data: {
        token: googleData.tokenId
      }
    })
    const data = await res.data
    console.log(data)
  }

  const handleFailedLogin = () => {
    console.log('Login failed!')
  }
  
  return ( 
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={handleFailedLogin}
      cookiePolicy={'single_host_origin'}
    />
   )
}
 
export default Login