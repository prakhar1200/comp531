import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'

describe('Validate Profile Actions', () => {

	let resource, url, fetchProfile

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')
				resource = require('../actions').default
				url = require('../actions').url
				fetchProfile = require('./fetchProfile').default
  			}
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})



	it('should Fetch All Profile Info (Zipcode and Email)',(done) =>{
				

		mock(`${url}/zipcode`, { 
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json: {
				 username : 'foo', zipcode : '77054'
			}
		})

		mock(`${url}/email`, { 
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json: {
				 username : 'foo', email : 'random@email.com'
			}
		})


		fetchProfile()(action => {
			
				switch (action.type) {

				case 'CHANGE_ZIPCODE':
				
				expect(action).to.eql({ type: 'CHANGE_ZIPCODE',
  							payload: '77054' })

	    		break

				case 'CHANGE_EMAIL':
				
				expect(action).to.eql({ type: 'CHANGE_EMAIL',
  							payload: 'random@email.com' })
				done()
			
					
				default :break
	
				}
		
		

		})
	
		
})

})


	




