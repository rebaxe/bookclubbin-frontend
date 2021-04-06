import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import googleImg from './images/google-attribution.png'

const useStyles = makeStyles((theme) => ({
  searchField: {
    margin: theme.spacing(1),
    width: '50%'
  },
  searchBtn: {
    border: 'none',
    background: 'none',
    '&:hover': {
      color: "#666",
   },
   padding: '2px',
   margin: '0'
  },
  helperText: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  image: {
    height: '10px'
  }
}))

const Search = () => {
  const classes = useStyles()
  const handleSearch = (e) => {
    console.log('You clicked search!')
    console.log(e.target.value)
  }
  return (
    <FormControl className={classes.searchField} variant="outlined">
          <InputLabel htmlFor="search-books">Search books</InputLabel>
          <OutlinedInput
            id="search-books"
            startAdornment={ 
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            }
            labelWidth={100}
            onChange={handleSearch}
            
          />
          <FormHelperText className={classes.helperText} >*Search by title or author.<img className={classes.image} src={googleImg} alt="Powered by Google"></img></FormHelperText>
        </FormControl>
  )
}
export default Search