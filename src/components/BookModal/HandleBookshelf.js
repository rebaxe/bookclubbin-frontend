import {
  FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, makeStyles,
} from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react'
import { addBook, getBookclubs, removeBook } from '../../api/apiCalls'
import { ClubsContext } from '../../contexts/ClubsContext'
import { UserContext } from '../../contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}))

const HandleBookshelf = (props) => {
  const { book } = props
  const classes = useStyles()
  const [user] = useContext(UserContext)
  const [clubs, setClubs] = useContext(ClubsContext)
  const [selectedClubId, setSelectedClubId] = useState(null)
  const [checkedRead, setCheckedRead] = useState(false)
  const [checkedTBR, setCheckedTBR] = useState(false)

  const handleChange = (e) => {
    setSelectedClubId(e.target.value)
  }

  useEffect(() => {
    setCheckedRead(false)
    setCheckedTBR(false)
    if (clubs.length !== 0) {
      clubs.forEach((club) => {
        if (club.id === selectedClubId) {
          club.booksSaved.forEach((savedBook) => {
            if (savedBook.googleId === book.googleId) {
              setCheckedTBR(true)
            }
          })
          club.booksRead.forEach((readBook) => {
            if (readBook.googleId === book.googleId) {
              setCheckedRead(true)
            }
          })
        }
      })
    }
  }, [selectedClubId])

  const handleCheckRead = async () => {
    if (checkedTBR) {
      setCheckedTBR(false)
    }

    if (checkedRead) {
      setCheckedRead(false)
      await removeBook(selectedClubId, 'bookRead', book)
    } else {
      setCheckedRead(true)
      addBook(selectedClubId, 'bookRead', book)
    }
    const res = await getBookclubs(user)
    setClubs(res.data)
  }

  const handleCheckTBR = async () => {
    if (checkedTBR) {
      setCheckedTBR(false)
      await removeBook(selectedClubId, 'bookSaved', book)
    } else {
      setCheckedTBR(true)
      addBook(selectedClubId, 'bookSaved', book)
    }
    const res = await getBookclubs(user)
    setClubs(res.data)
  }

  return (
    <>
      {clubs.length !== 0 && (
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Bookclub</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedClubId}
          onChange={(e) => handleChange(e)}
          label="Bookclub"
        >
          {clubs.map((club) => (
            <MenuItem value={club.id}>{club.clubname}</MenuItem>
          ))}
        </Select>
        <div className={classes.formContainer}>
          <FormControlLabel
            control={(
              <Checkbox
                disabled={checkedRead === true || selectedClubId === null}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checkedH"
                checked={checkedTBR}
                onChange={handleCheckTBR}
              />
          )}
            label="To Be Read"
          />
          <FormControlLabel
            control={(
              <Checkbox
                disabled={selectedClubId === null}
                checked={checkedRead}
                onChange={handleCheckRead}
                name="checkedB"
                color="primary"
              />
            )}
            label="Read"
          />
        </div>
      </FormControl>
      )}
    </>
  )
}

export default HandleBookshelf
