import {
  Paper, Typography, makeStyles, Divider, Button,
} from '@material-ui/core'
import { useState } from 'react'
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
}))

const BookShelf = (props) => {
  const { booksToRead, readBooks } = props
  const classes = useStyles()
  const [openTBR, setOpenTBR] = useState(false)
  const [openRead, setOpenRead] = useState(false)

  const handleTBR = () => {
    openTBR ? setOpenTBR(false) : setOpenTBR(true)
  }

  const handleRead = () => {
    openRead ? setOpenRead(false) : setOpenRead(true)
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
                <Button onClick={handleTBR}>View shelf</Button>
              </div>
            </>
          )
          : (<Typography>No books here yet...</Typography>)}
        <Typography className={classes.boldText}>Read books ☑️</Typography>
        {readBooks.length !== 0
          ? (
            <>
              <BookCarousel books={readBooks} />
              <div>
                <Button onClick={handleRead}>View shelf</Button>
              </div>
            </>
          )
          : <Typography>No books here yet...</Typography>}
        <BookList open={openTBR} shelf="0" books={booksToRead} handleDialog={handleTBR} header="TBR (To Be Read) 💛" />
        <BookList open={openRead} shelf="1" books={readBooks} handleDialog={handleRead} header="Read books ☑️" />
      </div>
    </Paper>
  )
}

export default BookShelf
