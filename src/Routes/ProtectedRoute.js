import { CircularProgress } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext, UserProvider } from '../UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={
      (props) => {
        if (user) {
          return <Component {...rest} {...props} />
        }
        return (
          <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location,
              },
            }
          }
          />
        )
      }
    }
    />
  )
}

export default ProtectedRoute
