import { Grid, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import { useContext, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from '../../UserContext'
import Error from '../FlashMessages/Error'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    // backgroundColor: 'rgba(39, 40, 44, 0.5)',
    color: '#D8A327',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  wrapper: {
    height: '80%',
  },
  title: {
    fontFamily: 'Orelega One',
  },
}))

const Login = () => {
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()
  const [openError, setOpenError] = useState(false)

  const handleLogin = async (googleData) => {
    try {
      // localStorage.setItem('accessToken', googleData.tokenId)
      const res = await axios({
        method: 'post',
        url: process.env.REACT_APP_AUTH_GOOGLE_URL,
        data: {
          token: googleData.tokenId,
        },
      })
      const data = await res.data
      console.log(data)
      setUser(data)
      history.push('/dashboard')
    } catch (error) {
      handleFailedLogin()
    }
  }

  const toggleError = () => {
    openError ? setOpenError(false) : setOpenError(true)
  }

  const handleFailedLogin = () => {
    toggleError()
  }

  return (
    <div className={classes.wrapper}>
      <Error open={openError} toggleError={toggleError} message="Log in with Google failed." />
      <div className={classes.root}>
        <Grid
          className={classes.container}
          container
          justify="center"
          align="center"
        >
          <Grid item xs={12} sm={8} md={6}>
            <Paper className={classes.paper} variant="outlined">
              <Typography className={classes.title} variant="h4">
                Let&apos;s go Clubbin&apos;!
              </Typography>
              <Typography variant="body1">
                Sign in with your Google account to enter the club.
              </Typography>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleFailedLogin}
                cookiePolicy="single_host_origin"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Login
