import {
  Avatar,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  React,
} from 'react'
import { AvatarGroup } from '@material-ui/lab'

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

const ClubContainer = (props) => {
  const { members, club } = props
  const classes = useStyles()
  return (
    <Paper className={classes.club}>
      <Typography className={classes.boldText}>{club.clubname}</Typography>
      {members.length > 0
        ? (
          <AvatarGroup>
            {members.map((member) => (
              <Avatar
                src={member.image}
                alt={member.username}
              />
            ))}
          </AvatarGroup>
        ) : (
          <Avatar
            src={members.image}
            alt={members.username}
          />
        )}
    </Paper>
  )
}

export default ClubContainer
