import { BehaviorSubject } from 'rxjs'

import { API_URL }                    from './config'
import { authHeader, handleResponse } from './util'

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
  login,
  logout,
  refresh,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value },
}

function refresh ()
{
  if (!authenticationService.currentUserValue) return
  if (authenticationService.currentUserValue.expiresAt < new Date().getTime())
  {
    console.log('refreshing token')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'refresh': authenticationService.currentUserValue.refresh,
      }),
    }
    return fetch(`${API_URL}/token/refresh/`, requestOptions).
      then(handleResponse).
      then(_saveUser).
      then(getCurrentUsername)
  }
}

const _saveUser = user =>
{
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  user.expiresAt = (new Date().getTime() + 45000)
  if (authenticationService.currentUserValue)
  {
    user = {refresh: authenticationService.currentUserValue.refresh, ...user}
  }

  localStorage.setItem('currentUser', JSON.stringify(user))
  document.cookie = 'X-Authentication=' + (user.access || '')
  currentUserSubject.next(user)

  return user
}

function login (username, password)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }

  return fetch(`${API_URL}/token/`, requestOptions).
    then(handleResponse).
    then(_saveUser).
    then(getCurrentUsername)
}

function logout ()
{
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
}

const getCurrentUsername = () =>
{
  fetch(`${API_URL}/current_user/`, {
    method: 'GET',
    headers: {
      ...authHeader(),
    },
  }).then(res => res.json()).then(json =>
  {
    const ret = JSON.parse(localStorage.getItem('currentUser'))
    ret.username = json.username ? json.username : null
    localStorage.setItem('currentUser', JSON.stringify(ret))
    const user = authenticationService.currentUserValue
    currentUserSubject.next(user)
  })
}
