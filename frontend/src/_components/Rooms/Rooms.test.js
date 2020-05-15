import React            from 'react'
import { render }       from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { act }          from 'react-dom/test-utils'
import Rooms            from '../Rooms/Rooms'

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

test('renders Rooms', () =>
{
  act(() =>
  {
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <Rooms rooms={[{id: 1, name: 'Nerdvana'}]}/>
      </MemoryRouter>, container,
    )
  })
  expect(container.innerHTML).
    toBe('<div><h2>Rooms</h2><div class="list-group">' +
      '<div class="list-group-item">' +
      '<a href="/Nerdvana">Nerdvana</a>' +
      '</div></div>' +
      '<h3>Create a Group</h3><form action=".">' +
      '<input type="text" name="name">' +
      '<button type="submit">Submit</button></form></div>')
})

