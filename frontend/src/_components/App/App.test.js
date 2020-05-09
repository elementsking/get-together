import React        from 'react'
import { render }   from '@testing-library/react'
import MemoryRouter from 'react-router-dom'
import App          from './App'

test('renders learn react link', () =>
{
  const {getByText} = render(
    <MemoryRouter>
      <App rooms={[{id: 1, name: 'Nerdvana'}]}/>
    </MemoryRouter>,
  )
  const linkElement = getByText(/Nerdvana/i)
  expect(linkElement).toBeInTheDocument()
})
