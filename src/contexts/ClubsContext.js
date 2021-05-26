import { createContext, useState } from 'react'

export const ClubsContext = createContext([])

export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([])
  return (
    <ClubsContext.Provider value={[clubs, setClubs]}>
      {children}
    </ClubsContext.Provider>
  )
}
