import {
  FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox,
} from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { addBook, getBookclub } from '../../api/apiCalls'
import { ClubsContext } from '../../ClubsContext'
import { UserContext } from '../../UserContext'

const HandleBookshelf = (props) => {
  const { book } = props
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
    clubs.forEach((club) => {
      console.log(club)
      if (club.id === selectedClubId) {
        club.booksSaved.forEach((savedBook) => {
          console.log(savedBook.googleId)
          console.log(book.googleId)
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
  }, [selectedClubId])

  const handleCheckRead = async () => {
    if (checkedTBR) {
      setCheckedTBR(false)
    }

    if (checkedRead) {
      setCheckedRead(false)
      const res = await axios({
        method: 'patch',
        url: `http://localhost:8081/api/v1/bookclubs/${selectedClubId}/books/remove`,
        data: {
          bookRead: book,
        },
      })
    } else {
      setCheckedRead(true)
      addBook(selectedClubId, 'bookRead', book)
      // const res = await axios({
      //   method: 'patch',
      //   url: `http://localhost:8081/api/v1/bookclubs/${selectedClubId}/books/add`,
      //   data: {
      //     bookRead: book,
      //   },
      // })
    }
    const updatedClubs = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_GET_CLUB}/${user.id}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    setClubs(updatedClubs.data)
  }

  const handleCheckTBR = async () => {
    if (checkedTBR) {
      setCheckedTBR(false)
      const res = await axios({
        method: 'patch',
        url: `http://localhost:8081/api/v1/bookclubs/${selectedClubId}/books/remove`,
        data: {
          bookSaved: book,
        },
      })
    } else {
      setCheckedTBR(true)
      const res = await axios({
        method: 'patch',
        url: `http://localhost:8081/api/v1/bookclubs/${selectedClubId}/books/add`,
        data: {
          bookSaved: book,
        },
      })
    }
    const clubData = await getBookclub(user)
    setClubs(clubData)
    // const updatedClubs = await axios({
    //   method: 'get',
    //   url: `${process.env.REACT_APP_GET_CLUB}/${user.id}`,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    // setClubs(updatedClubs.data)
  }

  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Bookclub</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selectedClubId}
        onChange={(e) => handleChange(e)}
        label="Bookclub"
      >
        {clubs.length !== 0
          ? (
            clubs.map((club) => (
              <MenuItem value={club.id}>{club.clubname}</MenuItem>
            ))
          ) : (
            <MenuItem value="">
              <em>You&apos;re not in a bookclub yet.</em>
            </MenuItem>
          )}
      </Select>
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
    </FormControl>
  )
}

export default HandleBookshelf
