import { TextField, Button, FormHelperText } from '@material-ui/core'
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
    justifyContent: 'space-between'
  },
  image: {
    height: '10px',
    padding: '3px 0px'
  },
  container: {
    margin: 30
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

  // useEffect(() => {
  //   console.log('Use effect')
  // })

  return (
    <div className={classes.container}>
      <form autoComplete="off" onSubmit={handleSearch}>
        <TextField
          label="Search books"
          id="search-books"
          variant="outlined"
          //helperText="*Search by title or author."
          fullWidth
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormHelperText className={classes.helperText}>*Search by title or author.<img className={classes.image} src={googleImg} alt="Powered by Google"></img></FormHelperText>
        <Button type="submit"><SearchIcon/></Button>
      </form>
      
      {searchResult !== null && searchResult.length > 0 &&
        <div className="result-container">
          <SearchResult result = { searchResult }/>
        </div>
      }
    </div>
  )
}
export default Search
