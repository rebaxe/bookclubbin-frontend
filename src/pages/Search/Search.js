import {
  TextField, Button, FormHelperText, InputAdornment, Typography, CircularProgress,
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import googleImg from './images/google-attribution.png'
import SearchResult from './SearchResult'
import Error from '../../components/FlashMessages/Error'
import { searchBooks } from '../../api/apiCalls'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  helperText: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.spacing(2),
  },
  image: {
    height: '10px',
    padding: '3px 0px',
  },
  container: {
    backgroundColor: '#f4f4f4',
    margin: 30,
    padding: '2rem',
    borderRadius: 20,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  searchOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: '0px 5px 10px',
    fontSize: '0.8rem',
  },
  searchField: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'green',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'purple',
    },
  },
  loading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Search = () => {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [searchPreferences, setSearchPreferences] = useState('intitle')
  const [searchResult, setSearchResult] = useState(null)
  const [openError, setOpenError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e, newSearchPreferences) => {
    setQuery('')
    setOpenError(false)
    setSearchResult(null)
    setSearchPreferences(newSearchPreferences)
  }

  const handleSearch = async (e) => {
    setIsLoading(true)
    setOpenError(false)
    e.preventDefault()
    if (query) {
      const result = await searchBooks(query, searchPreferences)

      if (result.status !== 200) {
        toggleError()
      }
      setSearchResult(result.data)
      setIsLoading(false)
    }
  }

  const toggleError = () => {
    openError ? setOpenError(false) : setOpenError(true)
  }

  return (
    <div className={classes.container}>
      <div className={classes.searchOptions}>
        <Typography variant="subtitle2">Search by </Typography>
        <ToggleButtonGroup
          value={searchPreferences}
          onChange={handleChange}
          exclusive
          size="small"
        >
          <ToggleButton value="intitle">
            Title
          </ToggleButton>
          <ToggleButton value="inauthor">
            Author
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <form autoComplete="off" onSubmit={handleSearch}>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searcField}
            label="Search books"
            id="search-books"
            variant="outlined"
            fullWidth
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">{query && <Button onClick={() => setQuery('')}><CloseIcon /></Button>}</InputAdornment>,
            }}
          />
          <Button type="submit"><SearchIcon /></Button>
        </div>
        <FormHelperText className={classes.helperText}>
          *Search by title or author.
          <img className={classes.image} src={googleImg} alt="Powered by Google" />
        </FormHelperText>
      </form>
      {searchResult !== null && searchResult.length > 0
        && (
        <div>
          <SearchResult result={searchResult} />
        </div>
        )}
      {openError && <Error open={openError} toggleError={toggleError} message="No results found." />}
      {isLoading && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}
export default Search
