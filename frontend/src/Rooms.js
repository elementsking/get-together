import React                                             from 'react'
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import Room                                              from './Room'

const Rooms = ({rooms}) =>
{
  let match = useRouteMatch()

  return <div>
    <h2>Rooms</h2>
    <ul>
      <li>
        <Link to={`${match.url}/chat`}>{match.url}</Link>
      </li>
    </ul>
    <Switch>
      <Route path={`${match.path}/:roomId`}>
        <Room/>
      </Route>
      <Route path={match.path}>
        <h3>Please select a room.</h3>
      </Route>
    </Switch>
  </div>
}

export default Rooms
