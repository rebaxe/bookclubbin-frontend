import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()

  useEffect(() => {
    if (true) {
      setUser({
        username: 'Kalle Svensson',
        image: 'https://randomuser.me/api/portraits/men/84.jpg',
        id: 123,
      })
      setIsLoading(false)
    } else {
      // Check if user is logged in and update context.
      axios({
        url: `${process.env.REACT_APP_AUTH_BASE_URL}/auth/google/auth`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 200) {
          setUser(res.data)
        } else {
          setUser(null)
        }
        setIsLoading(false)
      }).catch((error) => {
        setUser(null)
        setIsLoading(false)
      })
    }
  }, [location])

  return (
    isLoading ? <CircularProgress />
      : (
        <Route
          {...rest}
          render={(props) => (user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          ))}
        />
      )
  )
}

export default ProtectedRoute
