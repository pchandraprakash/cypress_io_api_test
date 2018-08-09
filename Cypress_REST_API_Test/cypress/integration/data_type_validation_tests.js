describe('data_type_validation_tests', () => {
	
	/* Test case to verify the data type of the fields in the response message */
	
	it('verify_data_types', () => {
		
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1')
		.then((body) => {
			expect(body.status).to.eq(200) //to assert response status_code.
			expect(body.body.page).to.be.an('number') //to check the data_type of page field.
			expect(body.body.results).to.be.an('array') //to check the data_type of results object.
			expect(body.body.results[0].adult).to.be.an('boolean') //to check the data_type of adult field.
			expect(body.body.results[0].original_title).to.be.an('string') //to check the data_type of original_title field
			expect(body.body.results[1].genre_ids).to.be.an('array') //to check the data_type of genre_ids object.
			expect(body.__proto__).to.be.an('object') //to check the type of __proto__ object
			expect(body.headers.connection).to.be.an('string') //to check the data_type of connection field
			expect(body.headers["x-ratelimit-limit"]).to.be.an('string') //to check the data_type of x-ratelimit-limit field
			expect(body.body.page).to.not.be.an('array') // not recommended
		})
	})
})