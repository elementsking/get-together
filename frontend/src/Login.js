import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import {API_HOST} from './App'

const Login = ({setter}) =>
{
  const username = useRef(null)
  const password = useRef(null)

  const performLogin = (evt) =>
  {
    evt.preventDefault()
    console.log('logging in')
    const ret = {}
    fetch(`http://${API_HOST}/api/v1/auth/`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    }).then(res => res.json()).then(json =>
    {
      localStorage.setItem('token', json.token)
      document.cookie = 'X-Authentication=' + (json.token || "")
      ret.logged_in = true
    }).catch(reason => console.error(reason))
    // fetch(`http://${API_HOST}/api/v1/current_user/`)
    // .then(res => res.json())
    // .then(json => ret.username = json.user.username)
    setter(ret)
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
    <button onClick={performLogin}>Submit</button>
  </Form>
}

export default Login
