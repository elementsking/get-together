import React            from 'react'
import { render }       from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { act }          from 'react-dom/test-utils'
import App              from './App'

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

test('renders Home', () =>
{
  act(() =>
  {
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>, container,
    )
  })
  expect(container.innerHTML).
    toBe('<div class="container">' +
      '<div class="row"><div class="col-md-8 col-12">' +
      '<nav class="navbar navbar-expand-lg navbar-light bg-light">' +
      '<a href="#/" class="navbar-brand">Get Together</a>' +
      '<div class="mr-auto navbar-nav">' +
      '<a href="/chat/" data-rb-event-key="/chat/" class="nav-link">Groups</a>' +
      '</div><div class="nav-item"><form class="">' +
      '<a href="/login" class="btn btn-primary">Log in</a></form></div></nav>' +
      '</div></div><div class="row"><div><div></div></div></div></div>')
})

