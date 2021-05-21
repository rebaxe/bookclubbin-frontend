import {
  AppBar, Button, Dialog, IconButton, List, ListItem, ListItemText, makeStyles, Tooltip, Typography,
} from '@material-ui/core'
import { Check, Close, Delete } from '@material-ui/icons'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addBook, getBookclubs, removeBook } from '../../api/apiCalls'
import { ClubsContext } from '../../ClubsContext'
import { UserContext } from '../../UserContext'
import BookModal from '../../components/Search/BookModal'

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
  book: {
    '&:hover': {
      color: '#D8A31A',
      cursor: 'pointer',
    },
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

  const handleMark = async (e) => {
    e.preventDefault()
    console.log('Mark as read')
    const bookGoogleId = e.currentTarget.value
    console.log(bookGoogleId)
    const bookToMark = books.filter((book) => book.googleId === bookGoogleId)

    await addBook(id, 'bookRead', bookToMark[0])
    await removeBook(id, 'bookSaved', bookToMark[0])
    const clubData = await getBookclubs(user)
    console.log(clubData)
    setClubs(clubData)
  }

  const handleRemove = async (e) => {
    e.preventDefault()
    console.log('Remove from saved')
    const bookGoogleId = e.currentTarget.value
    console.log(bookGoogleId)
    const bookToMark = books.filter((book) => book.googleId === bookGoogleId)
    let shelfToEdit = ''
    if (shelf === '0') {
      shelfToEdit = 'bookSaved'
    } else {
      shelfToEdit = 'bookRead'
    }

    await removeBook(id, shelfToEdit, bookToMark[0])
    const clubData = await getBookclubs(user)
    console.log(clubData)
    setClubs(clubData)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
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
                  <ListItemText className={classes.book} onClick={handleOpenModal}>
                    {book.title} by {book.authors}
                  </ListItemText>
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
                <BookModal
                  open={openModal}
                  handleClose={handleCloseModal}
                  book={book}
                  editable={false}
                />
              </>
            ))}
          </List>
        )}
    </Dialog>
  )
}

export default BookList
