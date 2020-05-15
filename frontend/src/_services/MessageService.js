import { API_URL }                    from './config'
import { authHeader, handleResponse } from './util'

export const messageService = {
  getAll,
}

function getAll ()
{
  const requestOptions = {method: 'GET', headers: authHeader()}
  return fetch(`${API_URL}/messages`, requestOptions).then(handleResponse)
}
