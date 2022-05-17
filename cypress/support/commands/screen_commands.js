Cypress.Commands.add('resize', (testContext, screen) => {
    cy.log(`[${screen[0]} x ${screen[1]}]`)
    cy.viewport(screen[0], screen[1])
})