describe('Members', () => {
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