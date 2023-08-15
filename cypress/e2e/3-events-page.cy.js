describe('Events', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/events');
  });

  it('Displays events', () => {
    cy.contains('bibendum felis sed interdum').should('exist');
  })

  it('Searches for event', () => {
    cy.get('#date').type('2023-05-19');
    cy.contains('ultrices posuere cubilia').should('not.exist');
    cy.contains('nulla facilisi cras').should('exist');
  })
})