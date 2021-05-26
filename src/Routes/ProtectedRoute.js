import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useContext(UserContext)

  return (
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
}

export default ProtectedRoute
