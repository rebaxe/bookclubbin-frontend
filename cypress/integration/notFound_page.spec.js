// Test for not found page.

describe('The Not Found Page', () => {
  it('successfully loads', () => {
    cy.visit('/random')
  })
  it('shows not found component', () => {
    cy.waitForReact()
    cy.react('NotFound')
  })
})
