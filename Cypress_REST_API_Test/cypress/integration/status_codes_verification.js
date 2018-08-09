describe('check_various_status_codes', () => {
	
	/* This function will create a token and session
	Reason for using XMLHttpRequest, please refer the link:
	https://www.npmjs.com/package/cypress-upload-file-post-form
	*/
	
	it('Create New Session', () => {
		var data = JSON.stringify({
		  "username": "pchandraprakash",
		  "password": "test@pi",
		  "request_token": cy.request('GET', 'authentication/token/new?api_key=606aaffd7ca10f0b80804a1f0674e4e1').its('body.request_token')
		});
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === this.DONE) {
			console.log(this.responseText);
		  }
		});
	xhr.open("POST", "authentication/token/validate_with_login?api_key=606aaffd7ca10f0b80804a1f0674e4e1");
	xhr.setRequestHeader("content-type", "application/json");

	xhr.send(data);
	cy.clearCookies()  
	})
	
	/* Test case to verify;
	status_code: 1
	status_message: Success. */
	
	it('TC001_statusCode_1', () => {
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1').its("status").should('equal',200)
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1').its("body.page").should('equal',1)
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1').its('headers').its('content-type').should('include', 'application/json')
		cy.clearCookies()
	})
	
	/* Test case to verify;
	status_code: 5
	status_message: Invalid parameters: Your request parameters are incorrect. 
	Note: In the console, please check status_code and status_message under body (Yielded).
	*/
	
	it('TC002_statusCode_5', () => {
		cy.request({
		  method:'POST',
		  url:'authentication/token/validate_with_login?api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_code').should('equal',5)
		
		cy.request({
		  method:'POST',
		  url:'authentication/token/validate_with_login?api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_message').should('equal','Invalid parameters: Your request parameters are incorrect.')
	})
	
	/* Test case to verify;
	status_code: 6
	status_message: Invalid id: The pre-requisite id is invalid or not found. */
	
	it('TC003_statusCode_6', () => {
		cy.request({
		  method:'POST',
		  url:'authentication/session/new?api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_code').should('equal',6)
		
		cy.request({
		  method:'POST',
		  url:'authentication/session/new?api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_message').should('equal','Invalid id: The pre-requisite id is invalid or not found.')
	})
	
	/* Test case to verify;
	status_code: 7
	status_message: Invalid API key: You must be granted a valid key. 
	Note: In the console, please check status_code and status_message under body (Yielded).
	*/
	
	it('TC004_statusCode_7', () => {
		cy.request({
		  method:'GET',
		  url:'discover/movie?api_key=616aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_code').should('equal',7)
		
		cy.request({
		  method:'GET',
		  url:'discover/movie?api_key=616aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_message').should('equal','Invalid API key: You must be granted a valid key.')
	})
	
	/* Test case to verify;
	status_code: 422: Unprocessable Entity
	status_message: page must be less than or equal to 1000 
	Note: In the console, please check error under body (Yielded).
	*/
	
	it('TC005_unprocessableEntity_1', () => {
		cy.request({
		  method:'GET',
		  url:'discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=10000', 
		  failOnStatusCode: false
		}).its('status').should('equal',422)
		
		cy.request({
		  method:'GET',
		  url:'discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=10000', 
		  failOnStatusCode: false
		}).its('body.errors.0').should('equal','page must be less than or equal to 1000')
	})
	
	/* Test case to verify;
	status_code: 422: Unprocessable Entity
	status_message: page must be greater than 0
	Note: In the console, please check error under body (Yielded).
	*/
	
	it('TC006_unprocessableEntity_2', () => {
		cy.request({
		  method:'GET',
		  url:'discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=-2000', 
		  failOnStatusCode: false
		}).its('status').should('equal',422)
		
		cy.request({
		  method:'GET',
		  url:'discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=-2000', 
		  failOnStatusCode: false
		}).its('body.errors.0').should('equal','page must be greater than 0')
	})
	
	/* Test case to verify;
	status_code: 34
	status_message: The resource you requested could not be found.
	Note: In the console, please check status_code and status_message under body (Yielded).
	*/
	
	it('TC007_statusCode_34', () => {
		cy.request({
		  method:'GET',
		  url:'discover/movies?api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('status').should('equal',404)
		
		cy.request({
		  method:'GET',
		  url:'discover/movies?api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_message').should('equal','The resource you requested could not be found.')
	})
	
	/* Test case to verify;
	status_code: 43
	status_message: Couldn't connect to the backend server.
	Note: In the console, please check status_code and status_message under body (Yielded).
	*/
	
	it('TC008_statusCode_43', () => {
		cy.request({
		  method:'GET',
		  url:'discover/movie?primary_release_date.gte=xxxx-xx-xx&primary_release_date.lte=2014-10-22&api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('status').should('equal',502)
		
		cy.request({
		  method:'GET',
		  url:'discover/movie?primary_release_date.gte=xxxx-xx-xx&primary_release_date.lte=2014-10-22&api_key=606aaffd7ca10f0b80804a1f0674e4e1', 
		  failOnStatusCode: false
		}).its('body.status_message').should('equal',"Couldn't connect to the backend server.")
	})
	
	/* Test case to verify;
	status_code: 3
	status_message: Authentication failed: You do not have permissions to access the service.
	Note: In the console, please check status_code and status_message under body (Yielded).
	*/
	
	it('TC009_statusCode_3', () => {
		cy.request({
		  method:'DELETE',
		  url:'list/{list_id}?api_key=606aaffd7ca10f0b80804a1f0674e4e1&language=en-US', 
		  failOnStatusCode: false
		}).its('status').should('equal',401)
		
		cy.request({
		  method:'DELETE',
		  url:'list/{list_id}?api_key=606aaffd7ca10f0b80804a1f0674e4e1&language=en-US', 
		  failOnStatusCode: false
		}).its('body.status_message').should('equal',"Authentication failed: You do not have permissions to access the service.")
	})
	
	/* Test case to verify;
	X-RateLimit in the response Header
	*/
	
	it('TC010_X-RateLimit', () => {
		cy.request('discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1').its('headers.x-ratelimit-limit').should('equal',"40")
	})
})
