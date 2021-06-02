describe('Dashboard page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'http://localhost:8081/api/v1/users/123', 'fixture:user.json')
    cy.route('GET', 'http://localhost:8081/api/v1/users/124', 'fixture:invitingUser.json')
    cy.route('GET', 'http://localhost:8081/api/v1/bookclubs/user/123', 'fixture:bookclubs.json')
    cy.route('GET', 'http://localhost:8081/api/v1/bookclubs/user/123/invites', 'fixture:invites.json')
  })
  it('check if route exists', () => {
    cy.visit('/dashboard')
  })
  it('check if club is shown', () => {
    cy.get('#clubnameText')
  })
  it('check if invite is shown', () => {
    cy.get('#invitationContainer')
    cy.get('#acceptBtn')
    cy.get('#rejectBtn')
  })
})
