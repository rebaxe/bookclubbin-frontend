import { Modal, Fade, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from '@material-ui/icons/Close'

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
    margin: theme.spacing(2)
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
      <Fade in={view}>
        <div className={classes.paper}>
          <Button onClick={() => {handleClose()}}>
            <CloseIcon />
          </Button>
          {book.image && <img src={book.image} alt={`Cover for ${book.title}`}/>}
          <h2 id="transition-modal-title">{book.title}</h2>
          {book.authors && <h2 id="transition-modal-title"> by {book.authors} </h2>}
          <p id="transition-modal-description">{book.description}</p>
          {book.pages && <h3>Pages: {book.pages}</h3>}
          {book.googleRating && <h3>Google Rating: {book.googleRating}</h3>}
        </div>
      </Fade>
      </Modal>
   );
}
 
export default BookModal;