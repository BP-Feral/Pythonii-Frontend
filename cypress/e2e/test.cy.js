describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.username-input').type('anna_johnson')
    cy.get('.password-input').type('secret123')
    cy.get('.login-button').click()

  })
})