describe('Book club page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'http://localhost:8081/api/v1/users/123', 'fixture:user.json')
    cy.route('GET', 'http://localhost:8081/api/v1/users/124', 'fixture:invitingUser.json')
    cy.route('GET', 'http://localhost:8081/api/v1/bookclubs/9', 'fixture:bookclub.json')
    cy.route('GET', 'http://localhost:8081/api/v1/users?searchString=*', 'fixture:users.json')
  })
  it('open edit members', () => {
    cy.visit('/bookclubs/9')
    cy.get('#editMembersBtn').click()
  })
  it('should have a list of members', () => {
    cy.get('.MuiList-root > :nth-child(1)').should('contain.text', 'Kalle Svensson')
    cy.get('.MuiList-root > :nth-child(2)').should('contain.text', 'Greta Andersson')
  })
  it('should display pending invite for invited user', () => {
    cy.get('.MuiList-root > :nth-child(2)').should('contain.text', 'Pending invite')
  })
  it('open textfield to invite user to the club', () => {
    cy.get('#addMemberToggleBtn').click()
  })
  it('view matching users', () => {
    cy.get('#addMemberField').type('Pe')
    cy.get('#addMemberField-option-0').should('contain', 'Pelle Persson')
    cy.get('#addMemberField-option-1').should('contain', 'Petronella Jonsson')
  })
})
