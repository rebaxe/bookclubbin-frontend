import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  React,
} from 'react'

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
  const classes = useStyles()
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
          <Button className={classes.btn}>Accept</Button>
          <Button className={classes.lighterBtn}>Reject</Button>
        </div>
      </div>
    </Paper>
  )
}

export default Invitation
