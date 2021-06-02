/* eslint-disable import/no-mutable-exports */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export let UserContext = null
export let UserProvider = null

if (false) {
  UserContext = createContext(null)
  UserProvider = ({ children }) => {
    const [user, setUser] = useState({
      username: 'Kalle Svensson',
      image: 'https://randomuser.me/api/portraits/men/84.jpg',
      id: 123,
    })
    return (
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    )
  }
} else {
  UserContext = createContext(null)
  UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // async function getUser() {
    // const res = await axios({
    // url: 'http://localhost:8081/api/v1/auth/google/auth',
    // withCredentials: true,
    // })
    // if (res.status === 200) {
    // setUser(res.data)
    // } else {
    // setUser(null)
    // }
    // }

    // useEffect(() => {
    // getUser()
    // }, [])

    return (
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    )
  }
}
