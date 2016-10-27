import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'

describe(	'Validate login', (done) => {

	let resource, url, login

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')
				resource = require('../actions').default
				url = require('../actions').url
				login = require('./authActions').default
  			}
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})


it('should Allow Login', (done) => {

		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'text/plain; charset=utf-8'},
			json : {username : 'foo' , result : 'success'}
		},{username : 'foo', passsword : 'blah'})

		login('foo', 'blah')(action => {
				expect(action.type).to.eql( 'Log_In')
  		
	 	
				done()
				
		})

})
	
	it('should not Allow to Login', (done) => {

		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'text/plain; charset=utf-8'},
			text : 'Unauthorized'
				
			
		},{username : 'bad', passsword : 'bad'})

		login('foo', 'blah')(action => {
				expect(action.type).to.eql('ERROR')
				done()
				
		})

})
	
})






	



