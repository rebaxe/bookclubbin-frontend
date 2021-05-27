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
