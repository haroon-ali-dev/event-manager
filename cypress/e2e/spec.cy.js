describe('Auth0 & db reseed', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/dashboard');
  });

  it('first check', () => {
    cy.contains("Upcoming Events").should("exist");
  })

  it('second check', () => {
    cy.contains("No upcoming events.").should("exist");
  })
})