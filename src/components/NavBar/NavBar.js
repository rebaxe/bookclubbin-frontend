import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import Menu from './Menu'

const useStyles = makeStyles((theme) => ({
  bar: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#606779',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '5px',
    cursor: 'pointer',
    fontFamily: 'Orelega One',
    color: '#D8A31A',
  },
  btn: {
    color: '#606779',
    transition: 'color 0.2s ease-out',
    '&:hover': {
      color: '#D8A31A',
    },
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
      <AppBar className={classes.bar} position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          { user
            && (
            <IconButton onClick={toggleMenu} edge="start" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            )}
          <Typography variant="h5" className={classes.title} onClick={() => { history.push('/') }}>
            <MenuBookIcon />
            {' '}
            BookClubbin&apos;
          </Typography>
          {!user
            ? <Button className={classes.btn} onClick={() => { history.push('/login') }}>Login</Button>
            : <Button className={classes.btn} onClick={() => { history.push('/logout') }}>Logout</Button>}
        </Toolbar>
      </AppBar>
      <Menu open={open} toggleMenu={toggleMenu} />
    </div>
  )
}

export default NavBar
