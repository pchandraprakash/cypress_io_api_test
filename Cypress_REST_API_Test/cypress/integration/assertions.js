describe('positive_negative_assertions', () => {
	
	/* before running any test this function will be executed */
	
	before(function () {
		cy.viewport(550, 750) 
		cy.clearCookies()
	})
	
	/* Test case to assert the movie title*/
	
	it('TC001_assert_1', () => {
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1')
			.its('body.results.0.title').should('deep.eq', 'Avengers: Infinity War')
	})
	
	/* Test case to assert the contents of registration page*/
	
	it('TC002_assert_2_loginScreen', () => {
		//cy.viewport("ipad-2")
		cy.visit('https://www.themoviedb.org/login')
		cy.visit('https://www.themoviedb.org/account/signup')
		cy.get('#username').type("phanindra").should("have.value", "phanindra")
		cy.get('#password').type("Ph@ni@pi").should("have.value", "Ph@ni@pi")
		cy.get('#password_confirm').type("Ph@ni@pi").should("have.value", "Ph@ni@pi")
		cy.get('.g-recaptcha').click()
		cy.get('.g-recaptcha').click({force: true})
		cy.clearCookies()
	})
	
	/* Test case to assert the title of the login page*/
	
	it('TC003_assert_3', () => {
		cy.visit('https://www.themoviedb.org/login')
		cy.title().should('include', 'Login — The Movie Database (TMDb)')
	})
	
	/* Test case to assert contents using cy.contains() */
	
	it('TC004_assert_4', () => {
		cy.visit('https://www.themoviedb.org/login')
		cy.get('h2')
		.contains("Login to your account")
		//BDD type assertion
		.should('contain','Login')
	})
	
	/* Test case to verify assertion using closures */
	
	it('TC005_assert_5', () => {
		cy.visit('https://www.themoviedb.org/login')
		cy.get('h2').should(($txt) => {
			const text = $txt.text()
			expect(text).to.match(/Login/)
		})
	})
	
	/* Test case to verify assertion using TDD Assertion */
	
	it('TC006_assert_6', () => {
		cy.visit('https://www.themoviedb.org/login')
		cy.get('h2').should(($txt) => {
			const text = $txt.text()			
			assert.equal("Login to your account", text, 'Check 1')
			assert.notEqual("Login to your account ", text, 'Check 2')
		})
	})
	
	/* Test case to assert the length of the array from a response message */
	
	it('TC007_assert_7', () => {
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1')
			.its('body.results.0.genre_ids').should('have.length', 4)
	})
	
	/* Test case to assert the response message contents */
	
	it('TC008_assert_8', () => {
			cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1').then((body) => {
			expect(body.body).to.have.property('results')
			expect(body.body.results).to.not.have.length(10)
			
			cy.visit('https://developers.themoviedb.org/3/discover/movie-discover')
			cy.get('.EndpointMethodUrl-path.f-1').should('not.have.value', 'Jane')
		})
	})
})
