import React               from 'react'
import { Redirect, Route } from 'react-router-dom'

import { authenticationService } from '../../_services'

const PrivateRoute = ({ children, ...rest }) => (
  <Route {...rest} render={({ location }) =>
  {
    const currentUser = authenticationService.currentUserValue
    if (!currentUser)
    {
      // not logged in so redirect to login page with the return url
      return <Redirect
        to={{ pathname: '/login', state: { from: location } }}/>
    }

    // authorised so return component
    return children
  }}/>
)
export default PrivateRoute
