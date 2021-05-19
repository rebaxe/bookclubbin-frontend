import {
  AppBar, Button, Dialog, IconButton, List, ListItem, ListItemText, makeStyles, Tooltip, Typography,
} from '@material-ui/core'
import { Check, Close, Delete } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))

const BookList = (props) => {
  const {
    books, open, handleDialog, header,
  } = props
  const classes = useStyles()

  return (
    <Dialog fullScreen open={open}>
      <AppBar className={classes.appBar}>
        <IconButton onClick={handleDialog}><Close /></IconButton>
        <Typography className={classes.boldText}>{header}</Typography>
      </AppBar>
      <List>
        {books.map((book) => (
          <ListItem key={book.googleId}>
            <ListItemText>{book.title} by {book.authors}</ListItemText>
            <Tooltip title="Mark as read"><IconButton><Check /></IconButton></Tooltip>
            <Tooltip title="Remove from TBR"><IconButton><Delete /></IconButton></Tooltip>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default BookList
