import {
  Avatar,
  Box,
  Button,
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
import Invitation from './Invitation'
import ClubContainer from './ClubContainer'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
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
  startClub: {
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

const Dashboard = () => {
  const [user] = useContext(UserContext)
  const classes = useStyles()
  const [club, setClub] = useState(null)
  const [members, setMembers] = useState([])
  const [invites, setInvites] = useState(null)
  const [invitingUser, setInvitingUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
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
          getMembers(res.data.members)
        } else if (res.status === 404) {
          setClub(null)
        }
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
          setIsLoading(true)
          setInvites(res.data)
          getInvitingUser(res.data.firstMember)
          setIsLoading(true)
        } else if (res.status === 404) {
          setInvites(null)
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [invitingUser])

  const handleCreateClub = () => {
    history.push('/create-club')
  }

  const getInvitingUser = async (userId) => {
    const URL = process.env.REACT_APP_GET_USER
    const res = await axios.get(`${URL}/${userId}`)
    console.log(res.data)
    setInvitingUser(res.data)
    // setIsLoading(false)
  }

  const getMembers = async (memberIds) => {
    console.log(memberIds)
    const URL = process.env.REACT_APP_GET_USER
    if (memberIds.length > 1) {
      memberIds.forEach(async (memberId) => {
        const res = await axios.get(`${URL}/${memberId}`)
        console.log(res.data)
        setMembers(...members, res.data)
      })
    } else {
      const res = await axios.get(`${URL}/${memberIds}`)
      console.log(res.data)
      setMembers(res.data)
    }
  }

  // useEffect(() => {
  //   console.log(club)
  //   setIsLoading(true)
  //   getMembers(club.members)
  // }, [club])

  useEffect(() => {
    if (club) {
      if (members.length === club.members.length) {
        setIsLoading(false)
        console.log(members)
      }
    }
  }, [members.length])

  return (
    <div>
      <Box className={classes.container} width={1}>
        <Box width={0.5}>
          <Paper className={classes.userInfo}>
            <Avatar src={user.image} />
            <Typography variant="h5">{user.username}</Typography>
          </Paper>
        </Box>
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
          {!club && !invites && (
            <Paper className={classes.club}>
              <Box className={classes.startClub}>
                <Typography>
                  Looks like you&apos;re not in a book club yet &#128546;
                </Typography>
                <Button className={classes.btn} onClick={handleCreateClub}>
                  Start book club
                </Button>
              </Box>
            </Paper>
          )}
          { club && !isLoading && (
            <ClubContainer members={members} club={club} />
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
      {/* <CreateClub open={openCreateClub} handleClose={handleCloseCreateClub} /> */}
    </div>
  )
}

export default Dashboard
