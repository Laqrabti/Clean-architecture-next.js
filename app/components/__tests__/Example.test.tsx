import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Button from '../button' // Your component

test('renders button with text', () => {
  render(<Button onClick={() => {}}>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})