import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { GroupWorkTwoTone } from '@material-ui/icons'

const Cookies = (props) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        icon={<GroupWorkTwoTone fontSize="inherit" />}
        severity="warning"
        onClose={handleClose}
      >
        We use cookies to give you a better experience of the app.
        If you continue to use the app you agree to this.
      </Alert>
    </Snackbar>
  )
}

export default Cookies
