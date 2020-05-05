import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useRouteMatch,
}                          from 'react-router-dom'
import Navbar              from 'react-bootstrap/Navbar'
import Nav                 from 'react-bootstrap/Nav'
import Button              from 'react-bootstrap/Button'
import Room                from './Room'
import Login               from './Login'

export const API_HOST = 'localhost:32791'

const App = () =>
{

  const [logState, setLogState] = useState({
    logged_in: false,
    username: '',
  })

  return <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#/">Get Together</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={'/chat/hippo'}>Groups</Nav.Link>
        </Nav>
      <Nav.Item>{logState.username ? logState.username : <Button
        href={'/login'}>Log in</Button>}</Nav.Item>
    </Navbar>

    <div>
      <Switch>
        <Route path="/chat/:id">
          <Room/>
        </Route>
        <Route path="/chat/">
          <Room/>
        </Route>
        <Route path={'/login'}>
          <Login setter={setLogState}/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>
}

const Home = () =>
{
  return <div></div>
}

export default App
