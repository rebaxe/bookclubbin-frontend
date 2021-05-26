import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, makeStyles,
} from '@material-ui/core'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { deleteAccount } from '../../api/apiCalls'
import { UserContext } from '../../contexts/UserContext'
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

const DeleteAccount = (props) => {
  const { open, handleClose, toggleMenu } = props
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)
  const [openError, setOpenError] = useState(false)
  const history = useHistory()

  const handleDelete = async () => {
    const res = await deleteAccount(user.id)
    if (res.status === 204) {
      setUser(null)
      handleClose()
      toggleMenu()
      history.push('/')
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
        <DialogTitle>Do you really want to delete your account? 😢</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you do - your account, memberships and invites will be removed from our database.
            Once you have deleted your account, the data can&apos;t be restored.
            Therefore, we wan&apos;t to ask you one more time -
            <b> are you sure that you wan&apos;t to delete your account?</b>
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
    </>
  )
}

export default DeleteAccount
