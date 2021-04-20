import React, { useContext, useState } from 'react'
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
import Menu from './Menu'

const useStyles = makeStyles((theme) => ({
  bar: {
    flexGrow: 1,
    backgroundColor: 'black'
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
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          { user &&
            <IconButton onClick={toggleMenu} edge="start" className={classes.menuButton} color="inherit">
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" className={classes.title} onClick={() => {history.push('/')}}>
            <MenuBookIcon/>  BookClubbin'
          </Typography>
          {!user
            ? <Button color="inherit" onClick={() => {history.push('/login')}}>Login</Button>
            : <Button color="inherit" onClick={() => {history.push('/logout')}}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
      <Menu open={open} toggleMenu={toggleMenu}/>
    </div>
  )
}

export default NavBar
