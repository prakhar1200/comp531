const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//Enable cross Origin Requests
const processCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, X-Session-Id, Accept')
  res.header('Access-Control-Expose-Headers','Location, X-Session-Id')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  if (req.method === 'OPTIONS'){
  	res.status(200).send('OK')
    
  }
  else {
  next()
  }
}
const app = express()
//using Middleware each request
app.use(bodyParser.json())
app.use(cookieParser())
app.use(processCors)

require('./auth.js')(app)
require('./following.js')(app)
require('./articles.js')(app)
require('./profile.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
