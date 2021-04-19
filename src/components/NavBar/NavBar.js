import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { UserContext } from '../../UserContext'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '5px',
    cursor: 'pointer',
  },
}))

const NavBar = () => {
  const classes = useStyles()
  const [user] = useContext(UserContext)
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={() => {history.push('/')}}>
            <MenuBookIcon/>  BookClubbin'
          </Typography>
          {!user
            ? <Button color="inherit" onClick={() => {history.push('/login')}}>Login</Button>
            : <Button color="inherit" onClick={() => {history.push('/logout')}}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
