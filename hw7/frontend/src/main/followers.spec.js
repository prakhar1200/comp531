import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'

describe('Validate Follower List is Populated', () => {

	let fetchFollowing,url,reduceFollower

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')
				url = require('../actions')
				fetchFollowing = require('./followers/followersAction').default
				reduceFollower = require('./followers/followersAction').reduceFollower
  			}
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})



	it('Follower Avatar and Headline Aggregated',(done) =>{
				

		const headlines = [{username : 'user', headline:'userStatus'},{username : 'otherUser', headline:'otheruserStatus'}]
		const avatars = [{username : 'user', avatar:'link1.com'},{username : 'otherUser', avatar:'link2.com'}]
		expect(reduceFollower(headlines,avatars)).to.eql([{username:'user',headline: 'userStatus', avatar:'link1.com'},{username:'otherUser',headline: 'otheruserStatus', avatar:'link2.com'}])
		done()	
		
})
	


})


	
