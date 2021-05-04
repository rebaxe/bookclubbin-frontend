import {
  Avatar,
  Box,
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
  const [invites, setInvites] = useState(null)
  const [invitingUser, setInvitingUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_GET_CLUB,
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
          setClub(res.data)
          console.log(club)
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
          <Paper className={classes.club}>
            {invites && !isLoading && (
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
            )}
            {isLoading && <CircularProgress />}
          </Paper>
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
          { club && (
            <Paper className={classes.club}>
              <Typography>{club.name}</Typography>
            </Paper>
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
