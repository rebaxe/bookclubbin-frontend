import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  React, useContext,
} from 'react'
import axios from 'axios'
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
  const { invitingUser, invites } = props
  const [user] = useContext(UserContext)
  const classes = useStyles()

  const handleAccept = async () => {
    console.log(invites)
    console.log(user)
    const URL = 'http://localhost:8081/api/v1/bookclubs/accept'
    const res = await axios({
      method: 'patch',
      url: URL,
      data: {
        clubId: invites.clubId,
        userId: user.id,
      },
    })
    console.log(res)
  }

  return (
    <Paper className={classes.club}>
      <div className={classes.inviteContainer}>
        <Typography variant="h6">You&apos;ve been invited to a book club!</Typography>
        <div className={classes.flexRow}>
          <Chip
            label={invitingUser.username}
            avatar={<Avatar src={invitingUser.image} />}
          />
          <Typography>invites you to join
            <span className={classes.boldText}> {invites.clubname}</span>.
          </Typography>
        </div>
        <div className={classes.flexRow}>
          <Button className={classes.btn} onClick={handleAccept}>Accept</Button>
          <Button className={classes.lighterBtn}>Reject</Button>
        </div>
      </div>
    </Paper>
  )
}

export default Invitation
