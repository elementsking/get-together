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

  let {from} = location.state || {from: {pathname: '/'}}

  // const authenticate = (evt) =>
  // {
  //   evt.preventDefault()
  //   console.log('logging in')
  //   const ret = {}
  //   fetch(`http://${API_HOST}/api/v1/token/`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: username.current.value,
  //       password: password.current.value,
  //     }),
  //   }).then(res => res.json()).then(json =>
  //   {
  //     localStorage.setItem('access_token', json.access)
  //     localStorage.setItem('refresh_token', json.refresh)
  //     document.cookie = 'X-Authentication=' + (json.access || '')
  //     ret.logged_in = true
  //     ret.access = json.access
  //     ret.refresh = json.refresh
  //   }).catch(reason => console.error(reason)).then(() =>
  //     fetch(`http://${API_HOST}/api/v1/current_user/`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
  //       },
  //     }).
  //       then(res => res.json()).
  //       then(json => ret.username = json.username ? json.username : null).
  //       then(() => {
  //         localStorage.setItem('currentUser', ret)
  //         setter(ret)
  //       }).then(() => history.replace(from)),
  //   )
  // }

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
