import { API_HOST }              from './config'
import { authenticationService } from './AuthenticationService'
import useWebSocket              from 'react-use-websocket'

export const useRoom = (id, onOpen, onMessage, onClose, onError) =>
{
  authenticationService.refresh()
  const socketUrl = 'ws://'
    + API_HOST
    + '/ws/chat/'
    + id
    + '/'

  return useWebSocket(socketUrl, {
    onOpen: onOpen,
    onMessage: onMessage,
    onClose: onClose,
    onError: onError,
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: () => true,
  })

}

export default useRoom
