var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)
     
     var payload = myResponse(req.url, req.body)
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}

function myResponse(requestType, reqPayload) {
	var payload
	
	switch (requestType) {
		case "/" :
			payload = { "hello": 'world'}
			break
		case "/articles":
			payload = { "articles" : [{"id":1, "author": 'Scott', "body" :'A post'}, {"id":2, "author": 'Prakhar', "body" :' Awesome post'}, {"id":3, "author": 'Palash', "body" :'JS post'}]}	
			break
		case "/login" :
			var body = JSON.parse(reqPayload)
			payload = {"username" : body["username"], "result":'success'}	
			break
		case "/logout" :
			payload = "OK"
			break
		default : break	  		
	}
	return payload
}