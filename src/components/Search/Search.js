import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import googleImg from './images/google-attribution.png'
import axios from 'axios'
import { useState } from 'react'
import SearchResult from './SearchResult.js'

const useStyles = makeStyles((theme) => ({
  searchField: {
    marginTop: '30px',
    margin: theme.spacing(1),
    width: '50%'
  },
  helperText: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  image: {
    height: '10px',
    padding: '3px 0px'
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Search = () => {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(query)
    const URL = process.env.REACT_APP_SEARCH_URL
    axios.get(URL, { 
      params: { query: query }
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
  }

  //useEffect(() => {
  //  console.log(query)
  //  const apiUrl = `http://localhost:8080/api/v1/search`
  //  axios.get(apiUrl, {
  //    body: JSON.stringify(query)
  //  }).then(res => {
  //    const books = res.data
  //    console.log(books)
  //  }).catch((error) => {
  //    console.log(error.message)
  //  })
  //})

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <FormControl className={classes.searchField}>
        <InputLabel htmlFor="search-books">Search books</InputLabel>
          <OutlinedInput
            id="search-books"
            labelWidth={100}
            onChange={(e) => setQuery(e.target.value)}
          />
        <FormHelperText className={classes.helperText}>*Search by title or author.<img className={classes.image} src={googleImg} alt="Powered by Google"></img></FormHelperText>
      <Button type="submit"><SearchIcon/></Button>
      </FormControl>
      </form>
      <div className="result-container">
        <SearchResult />
      </div>
    </div>
  )
}
export default Search