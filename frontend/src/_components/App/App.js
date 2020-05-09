import React, { useEffect, useState }             from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar                                     from 'react-bootstrap/Navbar'
import Nav                                        from 'react-bootstrap/Nav'
import Button                                     from 'react-bootstrap/Button'
import Room                                       from '../Room/Room'
import Login                                      from '../Login/Login'
import RoomRouter                                 from '../Rooms/Rooms'
import Container
                                                  from 'react-bootstrap/Container'
import Row                                        from 'react-bootstrap/Row'
import Col                                        from 'react-bootstrap/Col'
import Home                                       from '../Home/Home'
import PrivateRoute                               from '../util/PrivateRoute'
import Form                                       from 'react-bootstrap/Form'
import { authenticationService, groupService }    from '../../_services'

const App = () =>
{

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() =>
  {
    authenticationService.currentUser.subscribe(x => setCurrentUser(x))
  }, [])

  const [rooms, setRooms] = useState([])
  useEffect(() =>
  {
    groupService.getAll().
      then(groups => setRooms(groups))
  }, [])

  const logout = () =>
  {
    authenticationService.logout()
  }

  return <Container>
    <Router>
      <Row>
        <Col xs={12} md={8}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#/">Get Together</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href={'/chat/'}>Groups</Nav.Link>
            </Nav>
            <Nav.Item>
              {currentUser ?
               <span>{currentUser.username}
                 <Button onClick={logout} className="btn">Log out</Button>
               </span> :
               <Form>
                 <Button href={'/login'}>Log in</Button>
               </Form>}
            </Nav.Item>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <div>
          <Switch>
            <Route path="/chat/:id">
              <Room/>
            </Route>
            <PrivateRoute path="/chat/" logState={currentUser}>
              <RoomRouter rooms={rooms} setRooms={setRooms}/>
            </PrivateRoute>
            <Route path={'/login'}>
              <Login setter={setCurrentUser}/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Row>
    </Router>
  </Container>
}

export default App
