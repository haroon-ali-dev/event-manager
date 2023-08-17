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
  });


  
