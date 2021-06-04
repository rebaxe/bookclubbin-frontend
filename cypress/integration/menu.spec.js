describe('Check menu component', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', '**/api/v1/users/123', 'fixture:user.json')
    cy.route('GET', '**/api/v1/users/124', 'fixture:invitingUser.json')
    cy.route('GET', '**/api/v1/bookclubs/user/123', 'fixture:bookclubs.json')
    cy.route('GET', '**/api/v1/bookclubs/user/123/invites', 'fixture:invites.json')
  })
  it('menu not shown', () => {
    cy.visit('/dashboard')
    cy.get('#menu').should('not.to.exist')
  })
  it('open menu', () => {
    cy.visit('/dashboard')
    cy.get('#menuBtn').click()
    cy.get('#menu').should('exist')
  })
  it('contains username and image for logged in user', () => {
    cy.get('#userInfo')
      .should('contain', 'Kalle Svensson')
      .find('img').should('be.visible')
  })
  it('contains club', () => {
    cy.get('#clubItemText')
  })
  it('contains navigation to dashboard', () => {
    cy.get('#dashboardItem')
  })
  it('contains navigation to search', () => {
    cy.get('#searchItem')
  })
  it('contains navigation to start book club', () => {
    cy.get('#startClubItem')
  })
  it('contains navigations to delete account', () => {
    cy.get('#deleteAccountItem')
  })
})
