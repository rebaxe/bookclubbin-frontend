import { React, useContext } from 'react'
import { GoogleLogout } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { Paper, makeStyles, Typography } from '@material-ui/core'
import { UserContext } from '../../UserContext'
import { googleLogout } from '../../api/apiCalls'

const useStyles = makeStyles((theme) => ({
  paper: {
    color: '#D8A327',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1, 2),
  },
  logOutContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Orelega One',
  },
}))

const Logout = () => {
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()

  const handleLogout = async () => {
    await googleLogout()
    setUser(null)
    history.push('/')
  }
  return (
    <div className={classes.logOutContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>Log out from BookClubbin&apos;</Typography>
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        />
      </Paper>
    </div>
  )
}

export default Logout
