import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BookPreview from './BookPreview'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
}))

const SearchResult = (props) => {
  const { result: books } = props
  const classes = useStyles()
  return (
    <div>
      <Grid className={classes.container} container spacing={1} alignItems="stretch" justify="center">
        {books.map((book) => (
          <Grid key={book.googleId} item xs={12} sm={6} md={4}>
            <BookPreview book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SearchResult
