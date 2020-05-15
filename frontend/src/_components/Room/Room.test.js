import React            from 'react'
import { render }       from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { act }          from 'react-dom/test-utils'
import Room             from '../Room/Room'

let container

beforeEach(() =>
{
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() =>
{
  document.body.removeChild(container)
  container = null
})

test('renders a room', () =>
{
  act(() =>
  {
    render(
      <MemoryRouter initialEntries={['/chat/Nerdvana']}>
        <Room/>
      </MemoryRouter>, container,
    )
  })
  expect(container.innerHTML).
    toBe(
      '<div class="row">' +
      '<div class="col-md-8 col-12">' +
      '<textarea id="chat-log" cols="100" rows="20"></textarea>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-md-11 col-11">' +
      '<input id="chat-message-input" type="text">' +
      '</div><div class="col-md-1 col-1">' +
      '<input id="chat-message-submit" type="button" value="Send">' +
      '</div></div>')
})
