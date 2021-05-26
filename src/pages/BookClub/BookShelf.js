import {
  Paper, Typography, makeStyles, Divider, Button,
} from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BookCarousel from './BookCarousel'
import BookList from './BookList'

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(2, 1),
  },
  divider: {
    width: '100%',
  },
  coverImg: {
    objectFit: 'contain',
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
}))

const BookShelf = (props) => {
  const { booksToRead, readBooks } = props
  const classes = useStyles()
  const history = useHistory()
  const [openTBR, setOpenTBR] = useState(false)
  const [openRead, setOpenRead] = useState(false)

  const handleTBR = () => {
    openTBR ? setOpenTBR(false) : setOpenTBR(true)
  }

  const handleRead = () => {
    openRead ? setOpenRead(false) : setOpenRead(true)
  }

  const handleSearch = () => {
    history.push('/search')
  }

  return (
    <Paper>
      <div className={classes.container}>
        <Typography variant="h6" className={classes.boldText}>Bookshelf 📚</Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.boldText}>TBR (To Be Read) 💛</Typography>
        {booksToRead.length !== 0
          ? (
            <>
              <BookCarousel books={booksToRead} />
              <div>
                <Button className={classes.btn} onClick={handleTBR}>Edit</Button>
              </div>
            </>
          )
          : (
            <>
              <Typography>No books here yet...</Typography>
              <Button className={classes.btn} onClick={handleSearch}>Search books</Button>
            </>
          )}
        <Typography className={classes.boldText}>Read books ☑️</Typography>
        {readBooks.length !== 0
          ? (
            <>
              <BookCarousel books={readBooks} />
              <div>
                <Button className={classes.btn} onClick={handleRead}>Edit</Button>
              </div>
            </>
          )
          : (
            <>
              <Typography>No books here yet...</Typography>
              <Button className={classes.btn} onClick={handleSearch}>Search books</Button>
            </>
          )}
        <BookList open={openTBR} shelf="0" books={booksToRead} handleDialog={handleTBR} header="TBR (To Be Read) 💛" />
        <BookList open={openRead} shelf="1" books={readBooks} handleDialog={handleRead} header="Read books ☑️" />
      </div>
    </Paper>
  )
}

export default BookShelf
