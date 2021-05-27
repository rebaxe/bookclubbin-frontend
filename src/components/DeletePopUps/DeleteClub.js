import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, makeStyles,
} from '@material-ui/core'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteClub } from '../../api/apiCalls'
import Error from '../FlashMessages/Error'

const useStyles = makeStyles((theme) => ({
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

const DeleteClub = (props) => {
  const { open, handleClose } = props
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [openError, setOpenError] = useState(false)

  const handleDelete = async () => {
    const res = await deleteClub(id)
    if (res.status === 204) {
      history.push('/dashboard')
    } else {
      toggleError()
    }
  }

  const toggleError = () => {
    openError ? setOpenError(false) : setOpenError(true)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Do you really want to delete this club? 😢</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you have deleted the club, it can&apos;t be restored.
            Therefore, we wan&apos;t to ask you one more time -
            <b> are you sure that you wan&apos;t to delete this club?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.btn} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.btn} onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Error open={openError} message="Something went wrong. Could not delete this club." toggleError={toggleError} />
    </>
  )
}

export default DeleteClub
