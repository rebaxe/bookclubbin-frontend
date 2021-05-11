import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  React, useContext, useEffect, useState,
} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../UserContext'

const useStyles = makeStyles((theme) => ({
  club: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
  },
  btn: {
    backgroundColor: '#D8A31A',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    transition: '0.3s ease-in-out',
    '&:hover': {
      color: '#D8A31A',
    },
  },
  lighterBtn: {
    backgroundColor: '#D8A31A65',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    transition: '0.3s ease-in-out',
    '&:hover': {
      color: '#D8A31A',
    },
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  inviteContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize',
  },
}))

const Invitation = (props) => {
  const { invite } = props
  const [user] = useContext(UserContext)
  const [invitingUser, setInvitingUser] = useState(null)
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    const URL = process.env.REACT_APP_GET_USER
    axios.get(`${URL}/${invite.firstMember}`).then((res) => setInvitingUser(res.data))
  }, [])

  const handleAccept = async () => {
    console.log(invite)
    console.log(user)
    const URL = 'http://localhost:8081/api/v1/bookclubs/accept'
    const res = await axios({
      method: 'patch',
      url: URL,
      data: {
        clubId: invite.id,
        userId: user.id,
      },
    })
    history.push(`/bookclubs/${invite.id}`)
  }

  const handleReject = async () => {
    const URL = 'http://localhost:8081/api/v1/bookclubs/reject'
    const res = await axios({
      method: 'patch',
      url: URL,
      data: {
        clubId: invite.id,
        userId: user.id,
      },
    })
    history.push('/')
    history.push('/dashboard')
  }

  return (
    <Paper className={classes.club}>
      {invitingUser ? (
        <div className={classes.inviteContainer}>
          <Typography variant="h6">You&apos;ve been invited to a book club!</Typography>
          <div className={classes.flexRow}>
            <Chip
              label={invitingUser.username}
              avatar={<Avatar src={invitingUser.image} />}
            />
            <Typography>invites you to join
              <span className={classes.boldText}> {invite.clubname}</span>.
            </Typography>
          </div>
          <div className={classes.flexRow}>
            <Button className={classes.btn} onClick={handleAccept}>Accept</Button>
            <Button className={classes.lighterBtn} onClick={handleReject}>Reject</Button>
          </div>
        </div>
      ) : <CircularProgress />}
    </Paper>
  )
}

export default Invitation
