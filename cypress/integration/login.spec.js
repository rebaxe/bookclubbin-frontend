describe('The login page', () => {
  it('successfully loads', () => {
    cy.visit('/login')
  })
  it('contains Google login', () => {
    cy.get('#loginBox').should('contain.text', 'Log in with Google')
  })
})
