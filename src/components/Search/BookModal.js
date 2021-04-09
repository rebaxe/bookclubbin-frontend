import { Modal, Fade, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ClassSharp } from "@material-ui/icons"
import CloseIcon from '@material-ui/icons/Close'
import googleImg from './images/google-attribution.png'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(2),
    position: 'relative',
    width: '80%'
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  bookInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: '#333',
    fontSize: '0.8rem',
    gap: theme.spacing(2)
  },
  googleImage: {
    height: '10px',
    padding: '10px',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
}))

const BookModal = (props) => {
  const view = props.open
  const book = props.book
  const handleClose = props.handleClose
  const classes = useStyles()
  return ( 
    <Modal
        open={view}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
      <Fade in={view} >
        <div className={classes.paper}>
          <Button className={classes.closeBtn} onClick={() => {handleClose()}}>
            <CloseIcon />
          </Button>
          {book.image && <img src={book.image} alt={`Cover for ${book.title}`}/>}
          <h2 id="transition-modal-title">{book.title}</h2>
          {book.authors && <h2 id="transition-modal-title"> by {book.authors} </h2>}
          <p id="transition-modal-description">{book.description}</p>
          <div className={classes.bookInfoContainer}>
            {book.pages && <span>Pages: {book.pages}</span>}
            {book.googleRating && <span>Google Rating: {book.googleRating}</span>}
            <img className={classes.googleImage} src={googleImg} alt="Google Attribution"/>
          </div>
        </div>
      </Fade>
    </Modal>
   );
}
 
export default BookModal;