import React                                  from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Room                                   from '../Room/Room'
import Card                                   from 'react-bootstrap/Card'
import ListGroup                              from 'react-bootstrap/ListGroup'

const Rooms = ({rooms}) =>
{
  let match = useRouteMatch()

  return <div>
    <h2>Rooms</h2>
    {rooms.map((room) =>
      <ListGroup key={room.name}>
        <ListGroup.Item>
          <Card>
            <Card.Body>
              <Link to={`${room.name}`}>
                {room.name}
              </Link>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      </ListGroup>)
    }
    <Switch>
      {rooms.map((room) => <Route key={room.name} path={`${room.name}`}>
        <Room key={room.name}/>
      </Route>)}

      <Route path={match.path}>
        <h3>Create a Group</h3>

      </Route>
    </Switch>
  </div>
}

export default Rooms
