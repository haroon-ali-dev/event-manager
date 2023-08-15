describe('Display & search', () => {
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

describe('Form validation', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/events');
    cy.contains('Add New').click();
  });

  it('Required fields cannot be empty', () => {
    cy.get('[type=submit]').contains('Add').click();
    cy.contains('Name must be at least 3 characters').should('exist');
    cy.contains('Date must be a `date` type, but the final value was: `Invalid Date` (cast from the value `""`).').should('exist');
  })

  it('Name must be valid', () => {
    cy.get('[name=name]').type('a');
    cy.get('[type=submit]').contains('Add').click();
    cy.contains('Name must be at least 3 characters').should('exist');
  })
})

// create

// update

// delete