import BookPreview from './BookPreview.js'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  }
}))

const SearchResult = (props) => {
  const {result: books} = props
  const classes = useStyles()
  return (
    <div>
    <Grid className={classes.container} container /*alignItems="stretch" */spacing={2} alignItems="stretch" justify="center" >
        {books.map((book) => (
          <Grid key={book.googleId} item xs={12} sm={6} md={3}>
            <BookPreview book = {book}/>
          </Grid>
        ))}
      </Grid>
    </div>
   )
}
 
export default SearchResult