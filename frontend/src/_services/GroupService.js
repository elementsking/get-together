import { API_URL }                    from './config'
import { authHeader, handleResponse } from './util'

export const groupService = {
  getAll,
  create,
  get,
}

function getAll ()
{
  const requestOptions = {method: 'GET', headers: authHeader()}
  return fetch(`${API_URL}/groups/`, requestOptions).then(handleResponse)
}

function get (id)
{
  const requestOptions = {method: 'GET', headers: authHeader()}
  return fetch(`${API_URL}/groups/${id}/`, requestOptions).then(handleResponse)
}

function create (room)
{
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  }
  return fetch(`${API_URL}/groups/`, requestOptions).then(handleResponse)
}
