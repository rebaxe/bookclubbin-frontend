import {
  Modal, Fade, Button, Box, Typography, Paper,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { React } from 'react'
import googleImg from './images/google-attribution.png'

import HandleBookshelf from './HandleBookshelf'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      margin: theme.spacing(0),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: 5,
    maxHeight: '100%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4),
    margin: theme.spacing(2),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxHeight: '100%',
      margin: theme.spacing(2),
      gap: theme.spacing(1),
    },
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  book: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(2),
    flexShrink: 1,
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1),
    },
  },
  description: {
    maxHeight: '20rem',
    overflow: 'scroll',
    flexShrink: 2,
  },
  bookInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#333',
    fontSize: '0.8rem',
    gap: theme.spacing(2),
  },
  image: {
    minHeight: '100%',
    flexShrink: 1,
  },
  ratingContainer: {
    margin: 0,
  },
  rating: {
    color: '#333',
    fontSize: '0.8rem',
  },
}))

const BookModal = (props) => {
  const {
    open: view, book, editable, handleClose,
  } = props
  const classes = useStyles()

  return (
    <Modal
      open={view}
      className={classes.modal}
    >
      <Fade in={view}>
        <Paper className={classes.paper}>
          <Button
            className={classes.closeBtn}
            onClick={() => {
              handleClose()
            }}
          >
            <CloseIcon />
          </Button>
          {book.image && (
            <img
              className={classes.image}
              src={book.image}
              alt={`Cover for ${book.title}`}
            />
          )}
          <div className={classes.book}>
            <Typography className={classes.title} variant="h5">{book.title}</Typography>
            {book.authors && (
            <Typography className={classes.title} variant="h5">
              {' '}
              by
              {' '}
              {book.authors}
              {' '}
            </Typography>
            )}
            <div className={classes.description}>
              <Typography variant="body2">{book.description}</Typography>
            </div>
            <div className={classes.bookInfoContainer}>
              {book.publishedDate && (
              <Typography variant="subtitle2">
                Published:
                {' '}
                {book.publishedDate}
              </Typography>
              )}
              {book.pages && (
              <Typography variant="subtitle2">
                Pages:
                {' '}
                {book.pages}
              </Typography>
              )}
              {book.googleRating && (
              <Box className={classes.ratingContainer} component="fieldset" mb={3} borderColor="transparent">
                <Typography className={classes.rating} component="legend">
                  Google Rating
                </Typography>
                <Rating name="disabled" value={book.googleRating} disabled />
              </Box>
              )}
              <img src={googleImg} alt="Google Attribution" />
            </div>
            {editable && <HandleBookshelf book={book} />}
          </div>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default BookModal
