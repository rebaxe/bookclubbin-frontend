import BookPreview from './BookPreview.js'
import { Grid } from '@material-ui/core'

const SearchResult = (props) => {
  const {result: books} = props
  return (
    <div>
    <Grid container alignItems="stretch" justify="center" spacing={3}>
        {books.map((book) => (
          <Grid key={book.googleId} item xs={12} sm={6} md={6}>
            <BookPreview book={book}/>
          </Grid>
        ))}
      </Grid>
    </div>
   )
}
 
export default SearchResult