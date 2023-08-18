import { be } from "date-fns/locale";

describe('Display and search', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/members');
  });

  it('Displays members', () => {
    cy.contains('01H3HG091BARNMZNKTZVPYFRJW').should('exist');
  })
  it('Searches members', () => {
    cy.get('#email').type('hvivien2@jiathis.com');
    cy.contains('01H3HG091E37XFPA1VX9M42690').should('exist');
    cy.get('#email').clear();
  })
})

describe('Form validation', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    );
    cy.visit('/members');
    cy.contains('Add New').click();
  });

  it('Required fields cannot be empty', () => {
    cy.get('[type=submit]').contains('Add').click();
    cy.contains('First Name must be at least 3 characters').should('exist');
    cy.contains('Last Name must be at least 3 characters').should('exist');
    cy.contains('Please select a gender.').should('exist');
    cy.contains('Date of Birth must be a `date` type, but the final value was: `Invalid Date` (cast from the value `""`).').should('exist');
    cy.contains('Address must be at least 3 characters').should('exist');
    cy.contains('Email is a required field').should('exist');
    cy.contains('Mobile must be at least 3 characters').should('exist');
  });
  it('Creates a new member', () => {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#gender').select('Male');
    cy.get('#dateOfBirth').type('1990-01-01');
    cy.get('#address').type('123 Main St');
    cy.get('#postCode').type('12345').last();
    cy.get('[name=email]').type('john.mike@gmail.com');
    cy.get('#mobile').type('1234567890');
    cy.get('#additionalInfo').type('Additional information about John Doe');

    cy.get('[type=submit]').contains('Add').click();
    cy.contains('Member created.').should('exist');

    cy.contains('John Doe').should('exist');
  });

});