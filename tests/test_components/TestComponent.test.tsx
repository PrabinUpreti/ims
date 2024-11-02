import { describe, it } from 'vitest'

import { render } from '@testing-library/react'
import TestComponent from '../../src/components/TestComponent'
import React from 'react'

describe('TestComponent', () => {
  it('renders component', () => {
    render(<TestComponent />)
  })
})
