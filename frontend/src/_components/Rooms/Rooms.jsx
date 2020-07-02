import React, { useRef, useState }            from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Room                                   from '../Room/Room'
import ListGroup                              from 'react-bootstrap/ListGroup'
import { groupService }                       from '../../_services'
import Alert                                  from 'react-bootstrap/Alert'

const Rooms = ({rooms, setRooms}) =>
{
  let match = useRouteMatch()
  const [errors, setErrors] = useState()

  const roomRef = useRef()
  const createRoom = (event) =>
  {
    event.preventDefault()
    const room = {
      name: roomRef.current.value,
    }
    groupService.create(room).then((json) =>
    {
      setRooms([...rooms, json])
    }).catch((err) =>
    {
      setErrors(err)
    })
  }

  return <div>
    <h2>Rooms</h2>
    <ListGroup>
      {rooms.map((room) =>
        <ListGroup.Item key={room.id}>
          <Link to={`${room.id}`}>
            {room.name}
          </Link>
        </ListGroup.Item>,
      )}
    </ListGroup>
    <Switch>
      {rooms.map((room) => <Route key={room.id} path={`${room.id}`}>
        <Room key={room.id} room={room}/>
      </Route>)}

      <Route path={match.path}>
        <h3>Create a Group</h3>
        <form action={'.'}>
          {errors && <Alert variant={'danger'}>{errors}</Alert>}
          <input ref={roomRef} type={'text'} name={'name'}/>
          <button onClick={createRoom} type={'submit'}>Submit</button>
        </form>
      </Route>
    </Switch>
  </div>
}

export default Rooms
