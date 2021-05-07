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
  const [club, setClub] = useState(null)
  // const [members, setMembers] = useState([])
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
          setClub(res.data)
          console.log(res.data)
        } else if (res.status === 404) {
          setClub(null)
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
        } else if (res.status === 404) {
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
    console.log(res.data)
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
          {!club && !invites && !isLoading && (
            <NoClubContainer handleCreateClub={handleCreateClub} />
          )}
          { club && !isLoading && (
            <ClubContainer club={club} />
          )}
        </Box>
        {/* <Box width={0.5}>
            <Paper className={classes.meeting} >
              <Typography>Your next meeting will be displayed here.</Typography>
              <Box className={classes.calendar} width={0.5}>
                  <Typography variant="h2">23</Typography>
                  <Typography variant="h4">May</Typography>
                  <Typography variant="body1">@ 19.00</Typography>
              </Box>
            </Paper>
        </Box> */}
      </Box>
    </div>
  )
}

export default Dashboard
