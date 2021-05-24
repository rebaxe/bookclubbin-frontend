import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, makeStyles,
} from '@material-ui/core'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'

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
  const { open, handleClose } = props
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)

  const handleDelete = () => {
    console.log(`Delete user: ${user.id}`)
  }

  return (
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
  )
}

export default DeleteAccount
