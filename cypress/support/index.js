import './commands'

const pages = require('./pages/pages')
const screens = Cypress.env('sizes')

const user = {
    login: Cypress.env('USER_LOGIN'),
    password: Cypress.env('USER_PASSWORD'),
}

const generateCyTestObject = () => {
    return {
        pages,
        screens,
    }
}

beforeEach(function () {
    cy.wrap(generateCyTestObject()).as('ct')
})

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
