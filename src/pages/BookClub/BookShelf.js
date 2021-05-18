import {
  Paper, Typography, makeStyles, Divider,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(2, 1),
  },
  divider: {
    width: '100%',
  },
}))

const BookShelf = (props) => {
  const { booksToRead, readBooks } = props
  const classes = useStyles()

  return (
    <Paper>
      <div className={classes.container}>
        <Typography variant="h6" className={classes.boldText}>Bookshelf 📚</Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.boldText}>TBR (To Be Read) 💛</Typography>
        {booksToRead.length !== 0
          ? <Typography>Books you want to read will be shown here...</Typography>
          : <Typography>No books here yet...</Typography>}
        <Typography className={classes.boldText}>Read books ☑️</Typography>
        {readBooks.length !== 0
          ? <Typography>Books you have read will be shown here...</Typography>
          : <Typography>No books here yet...</Typography>}
      </div>
    </Paper>
  )
}

export default BookShelf
