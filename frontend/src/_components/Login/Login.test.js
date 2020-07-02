import React            from 'react'
import { render }       from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { act }          from 'react-dom/test-utils'
import Login            from './Login'

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

test('renders the login form', () =>
{
  act(() =>
  {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login/>
      </MemoryRouter>, container,
    )
  })
  expect(container.innerHTML).
    toBe('<form class="">' +
      '<div class="form-group">' +
      '<label class="form-label">Username</label>' +
      '<input type="text" class="form-control"></div>' +
      '<div class="form-group"><label class="form-label">Password</label>' +
      '<input type="password" class="form-control"></div>' +
      '<button type="button" class="btn btn-primary">Submit</button></form>')
})

