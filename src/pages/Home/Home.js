import { makeStyles } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import { ReactComponent as Reader } from './images/reader.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '90%',
  },
  text: {
    fontFamily: 'Orelega One',
    color: 'white',
    fontSize: '2.5rem',
  },
}))

const Home = () => {
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (false) {
      setUser({
        username: 'Kalle Svensson',
        image: 'https://randomuser.me/api/portraits/men/84.jpg',
        id: 123,
      })
      setIsLoading(false)
    } else {
      // Check if user is logged in and update context.
      axios({
        url: 'http://localhost:8081/api/v1/auth/google/auth',
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) {
          setUser(res.data)
        } else {
          setUser(null)
        }
        setIsLoading(false)
      }).catch((error) => {
        console.log(error)
        setUser(null)
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <div id="home" className={classes.container}>
      <Reader />
    </div>
  )
}

export default Home
