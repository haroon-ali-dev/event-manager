describe('Auth0', () => {
  beforeEach(() => {
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/dashboard');
  });

  it('has logged in', () => {
    cy.contains("Upcoming Events").should("exist");
  })

  it('has logged in', () => {
    cy.contains("No upcoming events.").should("exist");
  })
})