import React, { useEffect, useRef, useState } from 'react'
import { useParams }                          from 'react-router-dom'
import { API_HOST }                           from './App'

const Room = () =>
{
  const {id} = useParams()

  const chatLog = useRef(null)
  const submitButton = useRef(null)
  const messageBox = useRef(null)
  const [chatSocket, setChatSocket] = useState(new WebSocket(
    'ws://'
    + API_HOST
    + '/ws/chat/'
    + id
    + '/',
  ))
  useEffect(() =>
  {

    chatSocket.addEventListener('open',
      () => console.log('websocket opened successfully!'))

    chatSocket.addEventListener('message', (e) =>
    {
      const data = JSON.parse(e.data)
      chatLog.current.value += data.message + '\n'
    })
    return () =>
    {
      console.log('closing websocket')
      chatSocket.close()
    }
  })

  const sendMessage = () =>
  {
    const message = messageBox.current.value
    chatSocket.send(JSON.stringify({
      'message': message,
    }))
    messageBox.current.value = ''
  }

  const onEnter = (event) =>
  {
    if (event.keyCode === 13)
    {
      submitButton.click()
    }
  }

  return <>
    <div>
      <textarea id={'chat-log'} cols={100} rows={20} ref={chatLog}/><br/>
      <input id={'chat-message-input'} type={'text'} size={100}
             onKeyUp={onEnter} ref={messageBox}/><br/>
      <input id={'chat-message-submit'} type={'button'}
             value={'Send'}
             onClick={(e) => sendMessage()} ref={submitButton}/>
    </div>
  </>

}

export default Room
