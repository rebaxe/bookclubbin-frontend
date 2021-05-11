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
  const [invitingUser, setInvitingUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_GET_CLUB}/${user.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setBookClubs(res.data)
          const clubData = res.data.map((r) => ({ id: r.id, clubname: r.clubname }))
          console.log(clubData)
          setClubs(clubData)
        } else if (res.status === 204) {
          setBookClubs(null)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error.message)
      })
    axios
      .get(
        process.env.REACT_APP_GET_INVITE,
        {
          params: { id: user.id },
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setInvites(res.data)
          getInvitingUser(res.data.firstMember)
        } else if (res.status === 204) {
          setInvites(null)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  const handleCreateClub = () => {
    history.push('/create-club')
  }

  const getInvitingUser = async (userId) => {
    const URL = process.env.REACT_APP_GET_USER
    const res = await axios.get(`${URL}/${userId}`)
    setInvitingUser(res.data)
  }

  return (
    <div>
      <Box className={classes.container} width={1}>
        <UserContainer />
        <Box width={0.5}>
          {invites && !isLoading && (
            <div>
              <Invitation invitingUser={invitingUser} invites={invites} />
            </div>
          )}
          {isLoading && (
            <Paper className={classes.club}>
              <CircularProgress />
            </Paper>
          )}
          {!bookClubs && !invites && !isLoading && (
            <NoClubContainer handleCreateClub={handleCreateClub} />
          )}
          { bookClubs && !isLoading && (
            bookClubs.map((bookClub) => (
              <ClubContainer key={bookClub.id} club={bookClub} />
            ))
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard
