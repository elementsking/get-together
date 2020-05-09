import { API_HOST }              from './config'
import { authenticationService } from './AuthenticationService'
import useWebSocket              from 'react-use-websocket'

export const useRoom = (id, onOpen, onMessage, onClose) =>
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
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  })

}

export default useRoom
