import {
  Avatar, Button, CircularProgress, Divider, List, ListItem,
  ListItemAvatar, ListItemText, makeStyles, Paper, Typography,
} from '@material-ui/core'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  membersContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(2, 1),
  },
  memberList: {
    width: '100%',
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
  divider: {
    width: '100%',
  },
}))

const ClubMembers = (props) => {
  const { memberIds } = props
  const classes = useStyles()
  const [members, setMembers] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const membersURL = process.env.REACT_APP_GET_USER
    const memberPromises = memberIds.map((memberId) => axios.get(`${membersURL}/${memberId}`))
    Promise.all(memberPromises)
      .then((result) => setMembers(result.map((res) => res.data)))
      .catch(() => setError(true))
    setIsLoading(false)
  }, [memberIds])

  return (
    <Paper>
      {error && (
      <div>
        <Typography variant="h6">Sorry!</Typography>
        <Typography>Something went wrong... &#128546;</Typography>
      </div>
      )}
      {(isLoading || (!members.length && !error)) && <CircularProgress /> }
      {members.length !== 0 && !error && !isLoading && (
      <div className={classes.membersContainer}>
        <Typography variant="h6" className={classes.boldText}>The Bookworms 🐛</Typography>
        <Divider className={classes.divider} />
        <List className={classes.memberList}>
          {members.map((member) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar
                  src={member.image}
                  alt={member.username}
                />
              </ListItemAvatar>
              <ListItemText>{member.username}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Button className={classes.btn}>Edit members</Button>
      </div>
      )}
    </Paper>
  )
}

export default ClubMembers
