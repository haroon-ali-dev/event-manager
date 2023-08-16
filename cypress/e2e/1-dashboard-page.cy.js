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

describe('Member check-in', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/dashboard');
  });

  it('Finds member', () => {
    cy.contains('Check-in').click();
    cy.get('#memberId').type('01H3HG0917ZE91D5VA7MKWAD2A');
    cy.contains('Find').click();
    cy.contains('Sawyere').should('exist');
  })

  it('Checks-in members', () => {
    cy.contains('Check-in').click();
    cy.get('#memberId').type('01H3HG0917ZE91D5VA7MKWAD2A');
    cy.contains('Find').click();
    cy.contains('Sawyere').should('exist');
    cy.get('.btn-success').contains('Add').click();
    cy.contains('Attended List').click();
    cy.contains('Sawyere').should('exist');
  })
})