import { Avatar, Box, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import CreateClub from '../Club/CreateClub'

const useStyles = makeStyles((theme) => ({
  container: {
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
    "&:hover": {
      color: '#D8A31A'
    }
  }
}))

const Dashboard = () => {
  const [user] = useContext(UserContext)
  const classes = useStyles()
  const [ club, setClub ] = useState(null)
  const [openCreateClub, setOpenCreateClub] = useState(false)

  useEffect(() => {
    axios.get(process.env.REACT_APP_GET_CLUB, {
      params: {id: user.id}
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        setClub(res.data)
        console.log(club)
      } else if (res.status === 404) {
        setClub(null)
      }
    }).catch((error) => {
      console.log(error.message)
    })
  })

  const handleCreateClub = () => {
    setOpenCreateClub(true)
  }

  const handleCloseCreateClub = () => {
    setOpenCreateClub(false)
  }

  return (
    <div>
      <Box className={classes.container} width={1}>
        <Box width={0.5}>
          <Paper className={classes.userInfo} variant="outlined">
            <Avatar src={user.image}></Avatar>
            <Typography variant="h5">{user.username}</Typography>
          </Paper>
        </Box>
        <Box width={0.5}>
          <Paper className={classes.club}>
            {!club 
            ? <Box className={classes.startClub}>
                <Typography>Looks like you're not in a book club yet &#128546;</Typography>
                <Button className={classes.btn} onClick={handleCreateClub}>Start book club</Button>
              </Box>
            : <Typography>{club.name}</Typography>
            }
          </Paper>
        </Box>
      </Box>
      <CreateClub open={openCreateClub} handleClose={handleCloseCreateClub} />
    </div>
   )
}
 
export default Dashboard