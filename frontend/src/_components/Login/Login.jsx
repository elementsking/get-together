import React, { useRef }           from 'react'
import Form                        from 'react-bootstrap/Form'
import { useHistory, useLocation } from 'react-router-dom'
import { authenticationService }   from '../../_services'
import Button                      from 'react-bootstrap/Button'

const Login = (props) =>
{
  const username = useRef(null)
  const password = useRef(null)
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }

  const auth2 = (evt) =>
  {
    evt.preventDefault()
    authenticationService.login(username.current.value, password.current.value).
      then(history.replace(from))
  }

  return <Form>
    <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control ref={username} type="text"/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control ref={password} type="password"/>
    </Form.Group>
    <Button onClick={auth2}>Submit</Button>
  </Form>
}

export default Login
