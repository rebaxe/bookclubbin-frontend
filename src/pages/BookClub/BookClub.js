import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Box, CircularProgress, makeStyles, Paper, Typography,
} from '@material-ui/core'
import ClubMembers from './ClubMembers'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    gap: theme.spacing(2),
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0px',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  clubname: {
    textTransform: 'capitalize',
    padding: theme.spacing(1),
  },
}))

const BookClub = () => {
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const [club, setClub] = useState(null)

  useEffect(() => {
    const URL = process.env.REACT_APP_BOOKCLUBS
    axios.get(`${URL}/${id}`).then((res) => { res.status === 200 ? setClub(res.data) : history.push('/notfound') })
  }, [id])

  return (
    <div>
      {club ? (
        <Box className={classes.container} width={1}>
          <Box width={0.5}>
            <Paper className={classes.flexCol}>
              <Typography variant="h3" className={classes.clubname}>{club.clubname}</Typography>
            </Paper>
            <Box className={classes.flexRow} width={1}>
              <Box width={0.5}>
                <ClubMembers memberIds={club.members} />
              </Box>
              <Box width={0.5}>
                <Paper className={classes.flexCol}>
                  <Typography>With</Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : <CircularProgress />}
    </div>
  )
}

export default BookClub
