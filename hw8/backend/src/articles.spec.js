const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Articles Endpoint::', () => {

	it('should return atleast three articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(body).to.have.length.of.at.least(3)
		})
		.then(done)
		.catch(done)
 	}, 500)

	it('should return the posted article', (done) => {
		var now = new Date();
		const header= {
		method : "POST",
		headers: {
      		'Content-Type': 'application/json'
    		},
		body : JSON.stringify({"username":"Sam","date": "01/12/1993", "text": "SOme random text"})
		}; 
		fetch(url("/article"),header)
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var articles = {"id":4,"author":"Sam","text":"SOme random text","date":"01/12/1993","comments":[]}
			expect(body).to.equal(JSON.stringify(articles))

		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('should return the articles with specific id', (done) => {

		fetch(url("/articles/1"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var articles = '{"articles":[{"id":1,"author":"Scott","text":"A post","date":"2016-11-03T05:26:43.150Z","comments":[]}]}'
			expect(body).to.equal(articles)
		})
		.then(done)
		.catch(done)
 	}, 500)


	it('should return the articles with multiple id', (done) => {

		fetch(url("/articles/1,2"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var articles = '{"articles":[{"id":1,"author":"Scott","text":"A post","date":"2016-11-03T05:26:43.150Z","comments":[]},{"id":2,"author":"Prakhar","text":" Awesome post","date":"2016-11-02T09:34:43.150Z","comments":[]}]}'
			expect(body).to.equal(articles)
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('should return no articles with invalid id', (done) => {

		fetch(url("/articles/123"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var articles = '{"articles":[null]}'
			expect(body).to.equal(articles)
		})
		.then(done)
		.catch(done)
 	}, 500)

})
