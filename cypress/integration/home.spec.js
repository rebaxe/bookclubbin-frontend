// Test for the home page.

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
  it('contains app title and login button', () => {
    cy.contains('BookClubbin')
    cy.contains('Login')
  })
})
