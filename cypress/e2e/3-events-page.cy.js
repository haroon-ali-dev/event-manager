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

describe('CRUD', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/events');
  });

  it('Creates event', () => {
    cy.contains('Add New').click();
    cy.get('[name=name]').type('E3 2016');
    cy.get('[name=date]').type('2023-07-14');
    cy.get('[type=submit]').contains('Add').click();
    cy.contains('E3 2016').should('exist');
  })

  it('Updates event', () => {
    cy.get('.editEvent').first().click();
    cy.get('[name=name]').clear().type('RTX 2017');
    cy.get('[type=submit]').contains('Save').click();
    cy.contains('RTX 2017').should('exist');
  })

  it('Deletes event', () => {
    cy.get('.deleteEvent').first().click();
    cy.contains('Delete').click();
    cy.contains('ultrices posuere cubilia').should('not.exist');
  })
})