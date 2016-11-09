import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'

describe('Validate Headline Actions', () => {

	let changeHeadline,url

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')
				url = require('../actions')
				changeHeadline = require('./user/headlinesActions').default
  			}
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})



	it('Change Headline',(done) =>{
				

		mock(`${url}/headline`, { 
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			json: {
				 username : 'foo', headline : 'NewHeadline'
			}
		})

		


		changeHeadline('NewHeadline')(action => {
				expect(action).to.eql({ type: 'CHANGE_HEADLINE',
  							payload: 'NewHeadline' })
				

		})
		.then(done())
		
	
		
})

})


	
