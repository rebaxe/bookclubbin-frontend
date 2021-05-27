import { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  Box, Button, CircularProgress, makeStyles, Paper, Typography,
} from '@material-ui/core'
import ClubMembers from './ClubMembers'
import BookShelf from './BookShelf'
import { ClubsContext } from '../../contexts/ClubsContext'
import { getBookclub } from '../../api/apiCalls'
import DeleteClub from '../../components/DeletePopUps/DeleteClub'

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
  paper: {
    width: '100%',
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
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
  clubname: {
    maxWidth: '100%',
    fontFamily: 'Orelega One',
    textTransform: 'capitalize',
    padding: theme.spacing(1),
    overflowWrap: 'break-word',
  },
  warningBtn: {
    backgroundColor: '#611a15',
    color: 'white',
    padding: theme.spacing(1, 2),
    border: '1px solid #611a15',
    borderRadius: 20,
    transition: '0.3s ease-in-out',
    '&:hover': {
      color: '#611a15',
    },
  },
}))

const BookClub = () => {
  const [clubs] = useContext(ClubsContext)
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const [club, setClub] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  useEffect(() => {
    getBookclub(id)
      .then((res) => {
        if (res.status === 200) {
          setClub(res.data)
        } else {
          history.push('/notfound')
        }
      }).catch(() => history.push('/notfound'))
  }, [id, clubs])

  return (
    <div>
      {club ? (
        <Box className={classes.container} width={1}>
          <Box width={0.5}>
            <Paper className={classes.paper}>
              <Typography variant="h3" className={classes.clubname}>{club.clubname}</Typography>
            </Paper>
            <Box className={classes.flexRow} width={1}>
              <Box width={0.5}>
                <ClubMembers memberIds={club.members} />
              </Box>
              <Box width={0.5}>
                <BookShelf booksToRead={club.booksSaved} readBooks={club.booksRead} />
              </Box>
            </Box>
          </Box>
          <Button
            className={classes.warningBtn}
            onClick={handleOpenDelete}
          >
            Delete
          </Button>
          <DeleteClub open={openDelete} handleClose={handleCloseDelete} />
        </Box>
      ) : <CircularProgress />}
    </div>
  )
}

export default BookClub
