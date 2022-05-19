const { faker } = require('@faker-js/faker');

describe('SIGAA Login', function() {
    it('validate SIGAA login works for valid credentials and logout', function() 
    {
        const { login, dashboard } = this.ct.pages
        const user = this.ct.user
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.message).contains('por favor deslogue e feche o seu navegador').should('be.visible')
            cy.get(login.login).should('be.empty').type(user.login)
            cy.get(login.password).should('be.empty').type(user.password)
            cy.get(login.loginButton).should('contains.text', 'ENTRAR').click()
            cy.url().should('eq', 'https://sigaa.ufrn.br/sigaa/portais/discente/beta/discente.jsf')
            cy.get(dashboard.userName).should('contains.text', user.username).and('be.visible')
            cy.get(login.buttonLogOut).click()
            cy.url().should('eq', Cypress.config().baseUrl)
        })
    });

    it('validate SIGAA login with invalid password', function() 
    {
        const { login } = this.ct.pages
        const user = this.ct.user
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.login).should('be.empty').type(user.login)
            cy.get(login.password).should('be.empty').type(faker.internet.password())
            cy.get(login.loginButton).should('contains.text', 'ENTRAR').click()
            cy.get(login.alertInvalid).should('be.visible').and('have.text', 'Credenciais inválidas.')
            cy.get(login.login).clear()
        })
    });

    it('validate SIGAA login with null password', function() 
    {
        const { login } = this.ct.pages
        const user = this.ct.user
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.login).should('be.empty').type(user.login)
            cy.get(login.password).should('be.empty')
            cy.get(login.loginButton).should('contains.text', 'ENTRAR').click()
            cy.get(login.alertInvalid).should('be.visible').and('have.text', 'Credenciais inválidas.')
            cy.get(login.login).clear()
        })
    });

    it('validate SIGAA login with invalid login', function() 
    {
        const { login } = this.ct.pages
        const user = this.ct.user
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.login).should('be.empty').type(faker.internet.userName())
            cy.get(login.password).should('be.empty').type(user.password)
            cy.get(login.loginButton).should('contains.text', 'ENTRAR').click()
            cy.get(login.alertInvalid).should('be.visible').and('have.text', 'Credenciais inválidas.')
            cy.get(login.login).clear()
        })
    });

    it('validate SIGAA login with null username', function() 
    {
        const { login } = this.ct.pages
        const user = this.ct.user
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.login).should('be.empty')
            cy.get(login.password).should('be.empty').type(user.password)
            cy.get(login.loginButton).should('contains.text', 'ENTRAR').click()
            cy.get(login.alertInvalid).should('be.visible').and('have.text', 'Credenciais inválidas.')
        })
    });

    it('validate header', function()
    {
        const { login } = this.ct.pages
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each((screen, index) => 
        {
            cy.resize(this, screen)
            cy.get(login.ufrnLogo).should('have.attr', 'href').and('eq', 'https://www.ufrn.br/')
            cy.get(login.ufrnLogoImage).should('be.visible')
            if(index > 1)
            {
                cy.get(login.ufrnName).should('be.visible').and('have.text', 'UNIVERSIDADE FEDERAL DO RIO GRANDE DO NORTE')
            }
        })
    }),    
    
    it('validate footer', function()
    {
        const { login } = this.ct.pages
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.footerLogoSinfo).should('have.attr', 'href').and('eq', 'https://www.info.ufrn.br/')
            cy.get(login.footerLogoSinfo).should('be.visible')
            cy.get(login.footerContato).invoke('text').then(str => {
                /*'\n                Superintendência de Informática | +55 084 3215.3148 | Copyright ©\n                2006 - 2022 UFRN\n            ' */
                let txt = str.replace(/( )+/g, ' ')             //Removed " "
                txt = txt.replace(/(\r\n|\n|\r)/gm, "")         //Removed "\n"
                expect(txt).equal(' Superintendência de Informática | +55 084 3215.3148 | Copyright © 2006 - 2022 UFRN ')
            })
        })
    }), 
         
    it('validate modal login links', function()
    {
        const { login } = this.ct.pages
        const screens = this.ct.screens
     
        cy.visit(login.url)
        cy.wrap(screens).each(screen => 
        {
            cy.resize(this, screen)
            cy.get(login.optionLinks).should(($element) => 
            {
                expect($element).to.have.length(3)
                expect($element.eq(0)).to.contain('Cadastre-se')
                expect($element.eq(0)).to.have.attr('target').not.empty
                expect($element.eq(0)).to.have.attr('href')
                expect($element.eq(1)).to.contain('Familiares (cadastro)')
                expect($element.eq(1)).to.have.attr('target').not.empty
                expect($element.eq(1)).to.have.attr('href')
                expect($element.eq(2)).to.contain('Esqueceu a senha?')
                expect($element.eq(2)).to.have.attr('target').not.empty
                expect($element.eq(2)).to.have.attr('href')
            })
        })
    })         
})
