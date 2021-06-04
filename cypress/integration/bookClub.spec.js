describe('Book club page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', '**/api/v1/users/123', 'fixture:user.json')
    cy.route('GET', '**/api/v1/users/124', 'fixture:invitingUser.json')
    cy.route('GET', '**/api/v1/bookclubs/9', 'fixture:bookclub.json')
  })
  it('check if route exists', () => {
    cy.visit('/bookclubs/9')
  })
  it('should display clubname', () => {
    cy.get('#clubnameText').should('have.text', 'The club')
  })
  it('should have a club members box', () => {
    cy.get('#clubMembersComponent')
  })
  it('should have a bookshelf box', () => {
    cy.get('#bookshelfComponent')
  })
  it('should have delete button', () => {
    cy.get('#deleteClubBtn')
  })
})
