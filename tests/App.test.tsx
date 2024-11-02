import { describe, it } from 'vitest'

import { render } from '@testing-library/react'
import App from '../src/App'
import React from 'react'

describe('App', () => {
  it('renders component', () => {
    render(<App />)
  })
})
