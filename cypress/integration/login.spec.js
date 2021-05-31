// Test for the login page.

describe('The login page', () => {
  it('successfully loads', () => {
    cy.visit('/login')
  })
  it('contains login component', () => {
    cy.waitForReact()
    cy.react('Login')
  })
  it('contains Google Login', () => {
    cy.react('Login').contains('Log in with Google')
  })
})
