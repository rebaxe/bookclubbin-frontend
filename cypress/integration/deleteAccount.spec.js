describe('Check menu component', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'http://localhost:8081/api/v1/users/123', 'fixture:user.json')
    cy.route('GET', 'http://localhost:8081/api/v1/bookclubs/user/123', 'fixture:bookclubs.json')
  })
  it('delete account popup not visible', () => {
    cy.visit('/')
    cy.get('#menuBtn').click()
    cy.get('#deleteAccountDialog').should('not.to.exist')
  })
  it('delete account popup should appear to confirm action before delete', () => {
    cy.get('#deleteAccountItem').click()
    cy.get('#deleteAccountDialog').should('exist').should('contain', 'delete your account')
    cy.get('#cancelBtn')
    cy.get('#deleteAccountBtn')
  })
})
