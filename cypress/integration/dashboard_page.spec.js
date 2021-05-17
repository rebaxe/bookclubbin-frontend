import React, { createContext } from 'react'

const UserContext = React.createContext()

describe('Dashboard page', () => {
  it('go to dashboard page', () => {
    cy.visit('/dashboard')
  })
})
