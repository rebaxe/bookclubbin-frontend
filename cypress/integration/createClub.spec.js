describe('Create club page page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'http://localhost:8081/api/v1/users/123', 'fixture:user.json')
    cy.route('GET', 'http://localhost:8081/api/v1/users?searchString=*', 'fixture:users.json')
  })

  it('check if route exists', () => {
    cy.visit('/create-club')
  })
  it('enter clubname', () => {
    cy.get('#clubnameField').type('Klubben')
    cy.get('#nextBtn').click()
  })
  it('enter name', () => {
    cy.get('#searchUserField').type('Pe')
    cy.get('#addMemberBtn').should('be.disabled')
  })
  it('view matching users', () => {
    cy.get('#searchUserField-option-0').should('contain', 'Pelle Persson')
    cy.get('#searchUserField-option-1').should('contain', 'Petronella Jonsson')
  })
  it('select user', () => {
    cy.get('#searchUserField-option-0').click()
    cy.get('#addMemberBtn').should('be.enabled').click()
    cy.get('#memberContainer')
      .should('contain', 'You')
      .should('contain', 'Pelle Persson')
  })
  it('the logged in user will not show', () => {
    cy.get('#searchUserField').type('Kalle')
    cy.get('#searchUserField-option-0').should('not.exist')
  })
  it('form can not be submitted if a user object is not selected', () => {
    cy.get('#addMemberBtn').should('be.disabled')
  })
  it('a user that is already added will not show again', () => {
    cy.get('#searchUserField').clear().type('Pe')
    cy.get('#searchUserField-option-0').should('not.contain', 'Pelle Persson')
    cy.get('#nextBtn').click()
  })
  it('view data for the club to be created', () => {
    cy.get('#clubContainer')
      .should('contain', 'Klubben')
      .should('contain', 'You')
      .should('contain', 'Pelle Persson')
    cy.get('#nextBtn').should('contain', 'Submit')
  })
})
