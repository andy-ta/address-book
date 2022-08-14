import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('creates component', () => {
  render(<App />)
  expect(screen).toBeTruthy()
})
