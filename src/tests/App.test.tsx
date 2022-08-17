import React from 'react'
import { act, render } from '@testing-library/react'
import App from '../App'
import { unmountComponentAtNode } from 'react-dom'

let container: Element | null = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container)
    container.remove()
  }
  container = null
})

test('creates component', () => {
  act(() => {
    if (container) {
      render(<App />, { container })
    }
  })
  expect(container?.firstChild).toBeTruthy()
})
