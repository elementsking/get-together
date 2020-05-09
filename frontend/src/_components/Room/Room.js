import React, { useRef } from 'react'
import { useParams }     from 'react-router-dom'
import useRoom           from '../../_services/SubscribeRoom'
import Row               from 'react-bootstrap/Row'
import Col               from 'react-bootstrap/Col'
import './Room.css'

const Room = () =>
{
  const {id} = useParams()

  const chatLog = useRef(null)
  const submitButton = useRef(null)
  const messageBox = useRef(null)

  const {
    sendJsonMessage,
  } = useRoom(id,
    () => console.log('opened'),
    (e) =>
    {
      const data = JSON.parse(e.data)
      chatLog.current.value += data.message + '\n'
    },
    () => 'closing websocket',
  )

  const transmitMessage = () =>
  {
    const message = messageBox.current.value
    console.log(message)
    sendJsonMessage({'message': message})
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
    <Row>
      <Col xs={12} md={8}>
        <textarea id={'chat-log'} cols={100} rows={20} ref={chatLog}/>
      </Col>
    </Row>
    <Row>
      <Col xs={11} md={11}>
        <input id={'chat-message-input'} type={'text'}
               onKeyUp={onEnter} ref={messageBox}/>
      </Col>
      <Col xs={1} md={1}>
        <input id={'chat-message-submit'} type={'button'}
               value={'Send'}
               onClick={(e) => transmitMessage()} ref={submitButton}/>
      </Col>
    </Row>
  </>

}

export default Room
