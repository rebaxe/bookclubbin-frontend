import {
  Box,
  CircularProgress,
  makeStyles,
  Paper,
} from '@material-ui/core'
import {
  React, useContext, useEffect, useState,
} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import Invitation from './Invitation'
import ClubContainer from './ClubContainer'
import UserContainer from './UserContainer'
import NoClubContainer from './NoClubContainer'
import { ClubsContext } from '../../ClubsContext'
import { getBookclubs, getInvites } from '../../api/apiCalls'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  club: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
  },
  meeting: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
  },
  calendar: {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(1),
  },
}))

const Dashboard = () => {
  const [user] = useContext(UserContext)
  const classes = useStyles()
  const [bookClubs, setBookClubs] = useState(null)
  const [clubs, setClubs] = useContext(ClubsContext)
  const [invites, setInvites] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    console.log(user.id)
    getBookclubs(user).then((res) => {
      setClubs(res)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getInvites(user.id)
      .then((res) => {
        if (res.status === 200) {
          setInvites(res.data)
        } else if (res.status === 204) {
          setInvites(null)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [clubs])

  const handleCreateClub = () => {
    history.push('/create-club')
  }

  return (
    <div>
      <Box className={classes.container} width={1}>
        <UserContainer />
        <Box width={0.5}>
          {invites && !isLoading && (
            invites.map((invite) => <Invitation key={invite.id} invite={invite} />)
            // <div>
            //   <Invitation invitingUser={invitingUser} invites={invites} />
            // </div>
          )}
          {isLoading && (
            <Paper className={classes.club}>
              <CircularProgress />
            </Paper>
          )}
          {!clubs && !invites && !isLoading && (
            <NoClubContainer handleCreateClub={handleCreateClub} />
          )}
          { clubs && !isLoading && (
            clubs.map((bookClub) => (
              <ClubContainer key={bookClub.id} club={bookClub} />
            ))
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard
