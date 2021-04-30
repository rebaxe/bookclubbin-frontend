import {
  Avatar, Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Dashboard, Search } from '@material-ui/icons'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../UserContext'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 0,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    width: '100%',
    padding: 5,
    margin: 0,
  },
}))

const Menu = (props) => {
  const classes = useStyles()
  const [user] = useContext(UserContext)
  const history = useHistory()
  const { open, toggleMenu } = props

  return (
    <div>
      <Drawer
        className={classes.menu}
        open={open}
        onClose={toggleMenu}
        anchor="left"
      >
        <List className={classes.list}>
          { user
          && (
          <div className="loggedInList">
            <ListItem className={classes.userInfo}>
              <div className={classes.userInfo}>
                <ListItemAvatar>
                  <Avatar src={user.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                />
              </div>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push('/dashboard')
                toggleMenu()
              }}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push('/search')
                toggleMenu()
              }}
            >
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Search books" />
            </ListItem>
          </div>
          )}
        </List>
      </Drawer>
    </div>
  )
}

export default Menu
