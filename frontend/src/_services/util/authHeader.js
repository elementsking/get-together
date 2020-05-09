import { authenticationService } from '../index'

export function authHeader ()
{
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue
  if (currentUser && currentUser.access)
  {
    return {Authorization: `Bearer ${currentUser.access}`}
  } else
  {
    return {}
  }
}
