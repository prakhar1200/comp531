const expect = require('chai').expect
const fetch = require('isomorphic-fetch')


const url = path => `http://localhost:3000${path}`

describe('Validate Healdine Endpoint::', () => {

	it('should return healdine for default user', (done) => {
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var headlines = {"username": "sep1","headline": "my headline"}
			expect(body).to.equal(JSON.stringify(headlines))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('should return healdien for Requested Users', (done) => {
		fetch(url("/headlines/sep1,psd3"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var headlines = { headlines : [{"username": "sep1","headline": "my headline"},{"username": "psd3","headline": "psd3 headline"}]}
			expect(body).to.equal(JSON.stringify(headlines))
		})
		.then(done)
		.catch(done)
 	}, 2000)

 	it('should Update the Headline and return the new Headline', (done) =>{
 		const header= {
 		 	method : "PUT",    
    		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({"headline":"New Status"})
  		};
 		
 		fetch(url("/headline"),header)
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.equal(JSON.stringify({username:"sep1", headline : "New Status"}))
		})
		.then(done)
		.catch(done)

 	},2000)
	it('should return the New Headline for the default user afer the POST request', (done) => {
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var headlines = {"username": "sep1","headline": "New Status"}
			expect(body).to.equal(JSON.stringify(headlines))
		})
		.then(done)
		.catch(done)
 	}, 2000) 	


	


	

})
