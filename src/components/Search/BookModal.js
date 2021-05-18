import {
  Modal, Fade, Button, Box, Typography,
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
  },
  italic: {
    fontStyle: 'italic',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: 5,
    maxHeight: '80%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4),
    margin: theme.spacing(2),
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    // overflow: 'scroll',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxHeight: '90%',
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
  },
  description: {
    maxHeight: '20rem',
    overflow: 'scroll',
    flexShrink: 1,
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
  },
  googleImage: {
    height: '10px',
    padding: '10px',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  rating: {
    color: '#333',
    fontSize: '0.8rem',
  },
}))

const BookModal = (props) => {
  const { open: view } = props
  const { book } = props
  const { handleClose } = props
  const classes = useStyles()
  return (
    <Modal
      open={view}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Fade in={view}>
        <div className={classes.paper}>
          <Button
            className={classes.closeBtn}
            onClick={() => {
              handleClose()
            }}
          >
            <CloseIcon />
          </Button>
          <img className={classes.googleImage} src={googleImg} alt="Google Attribution" />
          {book.image && (
          <img
            className={classes.image}
            src={book.image}
            alt={`Cover for ${book.title}`}
          />
          )}
          <div className={classes.book}>
            <Typography variant="h4">{book.title}</Typography>
            {book.authors && (
            <Typography className={classes.italic} variant="h4">
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
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography className={classes.rating} component="legend">
                  Google Rating
                </Typography>
                <Rating name="disabled" value={book.googleRating} disabled />
              </Box>
              )}
            </div>
            <HandleBookshelf book={book} />
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default BookModal
