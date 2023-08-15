describe('Events', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/dashboard');
  });

  it('Displays events', () => {
    cy.contains("ultrices posuere cubilia").should("exist");
  })

  it('Displays checked-in members', () => {
    cy.contains("Attended List").click();
    cy.contains("Max Chamberlaine").should('exist')
  })
})