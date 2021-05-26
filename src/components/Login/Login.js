import {
  CircularProgress, Grid, Paper, Typography,
} from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from '../../contexts/UserContext'
import Error from '../FlashMessages/Error'
import { verifyGoogleLogin } from '../../api/apiCalls'

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
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (googleData) => {
    try {
      const res = await verifyGoogleLogin(googleData.tokenId)
      const data = await res.data
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

  useEffect(() => {
    if (user) {
      history.push('/dashboard')
    }
    setIsLoading(false)
  }, [user])

  return (
    <div className={classes.wrapper}>
      <Error open={openError} toggleError={toggleError} message="Log in with Google failed." />
      <div className={classes.root}>
        {isLoading ? <CircularProgress /> : (
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
        )}
      </div>
    </div>
  )
}

export default Login
