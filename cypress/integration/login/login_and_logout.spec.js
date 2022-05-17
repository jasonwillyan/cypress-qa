describe('Valid Login', function() {
    it('validates SIGAA login works for valid credentials', function() {
        const { login, dashboard } = this.ct.pages
		const user = this.ct.user
        const screens = this.ct.screens
        const urlBeta = 'https://sigaa.ufrn.br/sigaa/portais/discente/beta/discente.jsf'

        cy.visit(login.url)
        cy.wrap(screens).each((screen, index) => {
            cy.resize(this, screen)

            //Validate header
            cy.get(login.ufrnLogo).should('have.attr', 'href').and('eq', 'https://www.ufrn.br/')
            cy.get(login.ufrnLogoImage).should('be.visible')
            if(index > 1) {
                cy.get(login.ufrnName).should('be.visible').and('have.text', 'UNIVERSIDADE FEDERAL DO RIO GRANDE DO NORTE')
            }

            //Validate message
            cy.get(login.message).contains('por favor deslogue e feche o seu navegador').should('be.visible')
    
            //Validate footer
            cy.get(login.footerLogoSinfo).should('have.attr', 'href').and('eq', 'https://www.info.ufrn.br/')
            cy.get(login.footerLogoSinfo).should('be.visible')
            cy.get(login.footerContato).invoke('text').then(str => {
                /*'\n                Superintendência de Informática | +55 084 3215.3148 | Copyright ©\n                2006 - 2022 UFRN\n            ' */
                let txt = str.replace(/( )+/g, ' ')             //Removed " "
                txt = txt.replace(/(\r\n|\n|\r)/gm, "")         //Removed "\n"
                expect(txt).equal(' Superintendência de Informática | +55 084 3215.3148 | Copyright © 2006 - 2022 UFRN ')
            })
    
            //Validate form links
            cy.get(login.optionLinks).should(($element) => {
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
    
            //Login
            cy.get(login.login).should('be.empty').type(user.login)
            cy.get(login.password).should('be.empty').type(user.password)
            cy.get(login.loginButton).should('contains.text', 'ENTRAR').click()
    
            //Validate url
            cy.url().then(url => {
                if(url != urlBeta){
                    expect(url).to.equal('https://sigaa.ufrn.br/sigaa/portais/discente/discente.jsf')
                }else{
                    expect(url).to.equal(urlBeta)
                }
            })
    
            //Validate user name
            cy.get(dashboard.userName).should('contains.text', user.username).and('be.visible')
    
            //Log out
            cy.get(login.buttonLogOut).click()
            cy.url().should('eq', Cypress.config().baseUrl)
        })
    })
})
