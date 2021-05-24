import {
  Avatar, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dashboard, Delete, Group, GroupAdd, Search,
} from '@material-ui/icons'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ClubsContext } from '../../ClubsContext'
import { UserContext } from '../../UserContext'
import DeleteAccount from '../DeleteAccount/DeleteAccount'

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
    padding: theme.spacing(1),
    margin: 0,
  },
  clubname: {
    textTransform: 'capitalize',
    '.MuiTypography-body1': {
      overflowWrap: 'break-word',
    },
  },
  clubsHeader: {
    backgroundColor: '#f4f4f4',
  },
  clubContainer: {
    border: '1px solid black',
  },
  delete: {
    '&:hover': {
      backgroundColor: '#FDECEA',
    },
  },
}))

const Menu = (props) => {
  const classes = useStyles()
  const [user] = useContext(UserContext)
  const [clubs] = useContext(ClubsContext)
  const history = useHistory()
  const { open, toggleMenu } = props
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

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
            {clubs && (
              clubs.map((club) => (
                <ListItem
                  key={club.id}
                  button
                  onClick={() => {
                    history.push(`/bookclubs/${club.id}`)
                    toggleMenu()
                  }}
                >
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText className={classes.clubname} primary={club.clubname} style={{ overflowWrap: 'break-word' }} />
                </ListItem>
              ))
            )}
            <Divider />
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
            <ListItem
              button
              onClick={() => {
                history.push('/create-club')
                toggleMenu()
              }}
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Start book club" />
            </ListItem>
            <Divider />
            <ListItem
              className={classes.delete}
              button
              onClick={handleOpenDelete}
            >
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Delete account" />
            </ListItem>
          </div>
          )}
        </List>
      </Drawer>
      <DeleteAccount open={openDelete} handleClose={handleCloseDelete} />
    </div>
  )
}

export default Menu
