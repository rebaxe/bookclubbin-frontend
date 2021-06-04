// Test for not found page.

describe('The Not Found Page', () => {
  it('successfully loads', () => {
    cy.visit('/random')
  })
  it('shows not found', () => {
    cy.get('#notFoundContainer').should('contain.text', '404 - Not Found')
  })
})
