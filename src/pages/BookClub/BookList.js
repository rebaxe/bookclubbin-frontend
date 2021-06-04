import {
  AppBar, Dialog, IconButton, List, ListItem, ListItemText, makeStyles, Tooltip, Typography,
} from '@material-ui/core'
import {
  Check, Close, Delete, Info,
} from '@material-ui/icons'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addBook, getBookclubs, removeBook } from '../../api/apiCalls'
import { ClubsContext } from '../../contexts/ClubsContext'
import { UserContext } from '../../contexts/UserContext'
import BookModal from '../../components/BookModal/BookModal'
import googleImage from './images/google-attribution.png'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  googleImgContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
}))

const BookList = (props) => {
  const { id } = useParams()
  const [clubs, setClubs] = useContext(ClubsContext)
  const [user] = useContext(UserContext)
  const {
    books, shelf, open, handleDialog, header,
  } = props
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const [bookToOpen, setBookToOpen] = useState(null)

  const handleMark = async (e) => {
    e.preventDefault()
    const bookGoogleId = e.currentTarget.value
    const bookToMark = books.filter((book) => book.googleId === bookGoogleId)

    await addBook(id, 'bookRead', bookToMark[0])
    await removeBook(id, 'bookSaved', bookToMark[0])
    const res = await getBookclubs(user)
    setClubs(res.data)
  }

  const handleRemove = async (e) => {
    e.preventDefault()
    const bookGoogleId = e.currentTarget.value
    const bookToMark = books.filter((book) => book.googleId === bookGoogleId)
    let shelfToEdit = ''
    if (shelf === '0') {
      shelfToEdit = 'bookSaved'
    } else {
      shelfToEdit = 'bookRead'
    }

    await removeBook(id, shelfToEdit, bookToMark[0])
    const clubData = await getBookclubs(user)
    setClubs(clubData)
  }

  const handleOpenModal = (e) => {
    const bookGoogleId = e.currentTarget.value
    // Find book object with matching id.
    const matchingBook = books.filter((book) => book.googleId === bookGoogleId)
    setBookToOpen(matchingBook[0])
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setBookToOpen(null)
  }

  return (
    <Dialog fullScreen open={open}>
      <AppBar className={classes.appBar}>
        <IconButton onClick={handleDialog}><Close /></IconButton>
        <Typography className={classes.boldText}>{header}</Typography>
      </AppBar>
      {books.length === 0 ? <Typography>No books to show...</Typography>
        : (
          <List>
            {books.map((book) => (
              <>
                <ListItem key={book.googleId}>
                  <ListItemText>
                    {book.title} by {book.authors}
                  </ListItemText>
                  <Tooltip title="About this book">
                    <IconButton value={book.googleId} onClick={(e) => handleOpenModal(e)}>
                      <Info />
                    </IconButton>
                  </Tooltip>
                  {shelf === '0' && (
                  <Tooltip title="Mark as read">
                    <IconButton value={book.googleId} onClick={(e) => handleMark(e)}>
                      <Check />
                    </IconButton>
                  </Tooltip>
                  )}
                  <Tooltip title="Remove from shelf">
                    <IconButton value={book.googleId} onClick={(e) => handleRemove(e)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              </>
            ))}
          </List>
        )}
      {bookToOpen && (
        <BookModal
          open={openModal}
          handleClose={handleCloseModal}
          book={bookToOpen}
          editable={false}
        />
      )}
      <div className={classes.googleImgContainer}>
        <img src={googleImage} alt="Google attribution" />
      </div>
    </Dialog>
  )
}

export default BookList
