function loginViaAuth0Ui(username, password) {
    cy.visit('/dashboard')

    cy.origin(
        Cypress.env('auth0_domain'),
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username)
            cy.get('input#password').type(password, { log: false })
            cy.contains('Continue').click({ force: true })
        }
    )

    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'http://localhost:3000/dashboard')
}

Cypress.Commands.add('loginToAuth0', (username, password) => {
    const log = Cypress.log({
        displayName: 'AUTH0 LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        autoEnd: false,
    })
    log.snapshot('before')

    cy.session(`auth0-${username}`, () => {
        loginViaAuth0Ui(username, password);
    })

    log.snapshot('after')
    log.end()
})