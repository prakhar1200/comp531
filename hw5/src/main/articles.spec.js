import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'

describe('Validate Articles', () => {

	let fetchArticles,url

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')
				url = require('../actions')
				fetchArticles = require('./articles/articlesAction').default
  			}
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})



	it('Articles Fetched',(done) =>{
				

		mock(`${url}/articles`, { 
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json: {
				articles : [{id : 1, author : 'psd', date : '2015-09-02T13:24:10.068Z', img : 'http://lorempixel.com/371/314/', text : 'Pellentesque dapibus h', comments : [{author : 'yz16', commentId : '45', date : '2015-10-02T13:24:10.068Z', text : 'whatever'}]}]
			}
		})

		mock(`${url}/headlines`, { 
			
			headers: {'Content-Type': 'application/json'},
			json: {
				headlines :[{ username : 'foo', headline : 'Web Developer'} ]
			}
		})

		mock(`${url}/avatars`, { 
			
			headers: {'Content-Type': 'application/json'},
			json: {
				avatars :[{ username : 'foo', avatar : 'http://lorempixel.com/371/315/'} ]
			}
		})

		


		fetchArticles()(action => {
				expect(action.type).to.eql('CHANGE_HEADLINE')
				
})
		.then(done())
})	

})	
