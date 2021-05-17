/* eslint-disable import/no-mutable-exports */
import { createContext, useState } from 'react'

export let UserContext = null
export let UserProvider = null

if (false) {
  UserContext = createContext(null)
  UserProvider = ({ children }) => {
    const [user, setUser] = useState({
      id: 'xxx',
      username: 'Test Test',
      firstName: 'Test',
      image: '',
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
    return (
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    )
  }
}
