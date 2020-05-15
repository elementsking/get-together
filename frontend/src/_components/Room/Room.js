import React, { useEffect, useRef } from 'react'
import { useParams }                from 'react-router-dom'
import useRoom                      from '../../_services/SubscribeRoom'
import Row                          from 'react-bootstrap/Row'
import Col                          from 'react-bootstrap/Col'
import './Room.css'
import { groupService }             from '../../_services'

const Room = (room) =>
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
    () => chatLog.current.value += 'Failed to connect to server... Retrying\n',
  )

  useEffect(() =>
  {
    groupService.get(id).then((group) =>
    {
      group.posts.map((msg) =>
      {
        chatLog.current.value += msg.content + '\t' + msg.date_sent + '\n'
      })
    })
  }, [])

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
      submitButton.current.click()
    }
  }

  return <>
    <h3>{room.name}</h3>
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
               onClick={transmitMessage} ref={submitButton}/>
      </Col>
    </Row>
  </>

}

export default Room
