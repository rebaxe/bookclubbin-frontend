import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Error = (props) => {
  const classes = useStyles()
  const { open, toggleError } = props

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                toggleError()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          Log in with Google failed.
        </Alert>
      </Collapse>
    </div>
  )
}

export default Error
