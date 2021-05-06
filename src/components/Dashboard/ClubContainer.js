import {
  Avatar,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  React, useState, useEffect,
} from 'react'
import axios from 'axios'
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
  const { club } = props
  const classes = useStyles()
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const memberIds = club.members
    const URL = process.env.REACT_APP_GET_USER
    const memberPromises = memberIds.map((memberId) => axios.get(`${URL}/${memberId}`))
    Promise.all(memberPromises)
      .then((result) => setMembers(result.map((res) => res.data)))
      .catch((e) => setError(true))
    setIsLoading(false)
  }, [])

  return (
    <Paper className={classes.club}>
      {error && (
        <div>
          <Typography variant="h6">Sorry!</Typography>
          <Typography>Something went wrong... &#128546;</Typography>
        </div>
      )}
      {(isLoading || (!members.length && !error)) && <CircularProgress /> }
      {members.length !== 0 && !error && !isLoading && (
      <div>
        <Typography className={classes.boldText}>{club.clubname}</Typography>
        <AvatarGroup>
          {members.map((member) => (
            <Avatar
              key={member.id}
              src={member.image}
              alt={member.username}
            />
          ))}
        </AvatarGroup>
      </div>
      )}
    </Paper>
  )
}

export default ClubContainer
