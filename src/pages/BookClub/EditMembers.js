import {
  AppBar, Button, Dialog, IconButton, Typography, Tooltip,
  makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText,
} from '@material-ui/core'
import {
  AddCircle, Cancel, Close, RemoveCircle,
} from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  getBookclub, getBookclubs, getUserById, removeInvite, removeMember,
} from '../../api/apiCalls'
import { ClubsContext } from '../../contexts/ClubsContext'
import { UserContext } from '../../contexts/UserContext'
import InviteMember from './InviteMember'

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: 'relative',
  },
  appBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  listContainer: {
    maxHeight: '100%',
    overflow: 'scroll',
  },
  warningBtn: {
    backgroundColor: '#611a15',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    transition: '0.3s ease-in-out',
    '&:hover': {
      color: '#611a15',
    },
  },
  inviteUserContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingInvites: {
    margin: theme.spacing(1, 2),
    padding: theme.spacing(1, 2),
    border: '1px solid #D8A31A',
    borderRadius: '20px',
  },
  avatars: {
    margin: theme.spacing(1, 0),
  },
  pendingText: {
    color: '#707070',
  },
  pendingAvatar: {
    opacity: '50%',
  },
}))

const EditMembers = (props) => {
  const { open, handleDialog, members } = props
  const { id: clubId } = useParams()
  const classes = useStyles()
  const [user] = useContext(UserContext)
  const [clubs, setClubs] = useContext(ClubsContext)
  const [invitedMembers, setInvitedMembers] = useState([])
  const [openAddMember, setOpenAddMember] = useState(false)
  const history = useHistory()

  useEffect(() => {
    getBookclub(clubId).then((res) => {
      if (res.data.invitations) {
        const promises = res.data.invitations.map((invite) => getUserById(invite.invitedUser))
        Promise.all(promises)
          .then((response) => setInvitedMembers(response.map((resp) => resp.data)))
          .catch(() => console.log('Something went wrong'))
      }
    })
  }, [clubs])

  const handleRemove = async (e) => {
    try {
      const memberId = e.currentTarget.value
      await removeMember(clubId, memberId)
      const res = await getBookclubs(user)
      setClubs(res.data)
      if (memberId === user.id) {
        history.push('/dashboard')
      }
    } catch {
      history.push('/dashboard')
    }
  }

  const handleRemoveInvite = async (e) => {
    const memberId = e.currentTarget.value
    await removeInvite(clubId, memberId)
    const clubData = await getBookclubs(user)
    setClubs(clubData)
  }

  const toggleAddMember = () => {
    openAddMember ? setOpenAddMember(false) : setOpenAddMember(true)
  }

  return (
    <Dialog className={classes.dialog} fullScreen open={open}>
      <AppBar className={classes.appBar}>
        <IconButton onClick={handleDialog}><Close /></IconButton>
        <Typography className={classes.boldText}>Edit members</Typography>
      </AppBar>
      <List className={classes.listContainer}>
        {members.map((member) => (
          <>
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar
                  src={member.image}
                  alt={member.username}
                />
              </ListItemAvatar>
              <ListItemText>{member.username}</ListItemText>
              {user.id === member.id
                ? (
                  <Button
                    className={classes.warningBtn}
                    value={member.id}
                    onClick={(e) => handleRemove(e)}
                  >
                    Leave bookclub
                  </Button>
                ) : (
                  <Tooltip title="Remove from bookclub">
                    <IconButton value={member.id} onClick={(e) => handleRemove(e)}>
                      <RemoveCircle />
                    </IconButton>
                  </Tooltip>
                )}
            </ListItem>
          </>
        ))}
        {invitedMembers.map((member) => (
          <>
            <ListItem key={member.id}>
              <ListItemAvatar className={classes.pendingAvatar}>
                <Avatar
                  src={member.image}
                  alt={member.username}
                />
              </ListItemAvatar>
              <ListItemText className={classes.pendingText}>{member.username}</ListItemText>
              <Typography className={classes.pendingText}>Pending invite</Typography>
              <Tooltip title="Remove invite">
                <IconButton value={member.id} onClick={(e) => handleRemoveInvite(e)}>
                  <Cancel />
                </IconButton>
              </Tooltip>
            </ListItem>
          </>
        ))}
        <ListItem>
          <Tooltip title="Add member">
            <IconButton onClick={toggleAddMember}>
              <AddCircle />
            </IconButton>
          </Tooltip>
          {openAddMember && <InviteMember />}
        </ListItem>
      </List>
    </Dialog>
  )
}

export default EditMembers
