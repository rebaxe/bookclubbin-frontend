import { TextField, Button, FormHelperText } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import googleImg from './images/google-attribution.png'
import axios from 'axios'
import { useState } from 'react'
import SearchResult from './SearchResult.js'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  helperText: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.spacing(2)
  },
  image: {
    height: '10px',
    padding: '3px 0px'
  },
  container: {
    margin: 30
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1)
  },
  searchOptions: {
    padding: '10px 5px',
    fontSize: '0.8rem',
    color: '#333'
  }
}))

const Search = () => {
  const classes = useStyles()
  const [query, setQuery] = useState(null)
  const [searchPreferences, setSearchPreferences] = useState('title')
  const [searchResult, setSearchResult] = useState(null)
  
  const handleChange = (e, newSearchPreferences) => {
    setQuery('')
    setSearchResult(null)
    setSearchPreferences(newSearchPreferences)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query) {
      console.log(query)
      const URL = process.env.REACT_APP_SEARCH_URL
      axios.get(URL, { 
        params: { query: `${query}+${searchPreferences}:${query}` }
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }, {
        body: JSON.stringify(query)
      }).then(res => {
        const books = res.data
        setSearchResult(books)
        console.log(searchResult)
      }).catch((error) => {
        console.log(error.message)
      })
    } else {
      console.log('Enter a query')
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.searchOptions}>
          <span>Search by </span>          
            <ToggleButtonGroup 
            value={searchPreferences}
            onChange={handleChange}
            exclusive
            size="small">
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
          label="Search books"
          id="search-books"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit"><SearchIcon/></Button>
        </div>
        <FormHelperText className={classes.helperText}>*Search by title or author.<img className={classes.image} src={googleImg} alt="Powered by Google"></img></FormHelperText>
      </form>
      
      {searchResult !== null && searchResult.length > 0 &&
        <div>
          <SearchResult result = { searchResult }/>
        </div>
      }
    </div>
  )
}
export default Search
