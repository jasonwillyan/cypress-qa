describe('Valid Login', function() {
    it('validates SIGAA login works for valid credentials', function() {
        const { login } = this.ct.pages
		const user = this.ct.user

        cy.visit(login.url)
		cy.get(login.login).type(user.login)
		cy.get(login.password).type(user.password)
        cy.get(login.loginButton).click()
    });
});
