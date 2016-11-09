const articles = [{"id":1, "author": 'Scott', "text" :'A post', date : "2016-11-03T05:26:43.150Z", comments: [] }, {"id":2, "author": 'Prakhar', "text" :' Awesome post', date : "2016-11-02T09:34:43.150Z", comments: []}, {"id":3, "author": 'Palash', "text" :'JS post', date : "2016-11-03T06:46:43.150Z", comments: []}]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)   
     articles.push({"id":articles.length+1, "author": req.body.username||"Scott", "text" :req.body.text , date : req.body.date||new Date(), comments : []})
     res.send(articles[articles.length-1])
}

const getArticle = (req, res) => {

	if(req.params.id) {
		const requestedArticles =[];
		const requestedID = req.params.id.split(',') || req.params.id
		requestedID.forEach((id) => {
			console.log(articles.filter((article) => {return article.id == id })[0])
		requestedArticles.push(articles.filter((article) => {return article.id == id })[0])
		return
		})
		res.send({"articles" : requestedArticles})
	}
	else {
		res.send( { "articles" : articles})
	}

}

const putArticle = (req, res) => {
	{
	res.send({"id":req.params.id||"1", "author": 'Scott', "text" :'Changed Text', date : new Date(), comments: []})
	}
} 

module.exports = app => {

     app.get('/articles/:id*?', getArticle)
     app.post('/article', addArticle)	
     app.put('/article/id', putArticle)

}
