const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const processCors = (req, res, next) => {

  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, X-Session-Id, Accept')
  res.header('Access-Control-Expose-Headers','Location, X-Session-Id')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  if (req.method === 'OPTIONS'){
  	console.log("options")
  	res.status(200).send('OK')
    
  }
  else {
  	console.log("Next")
  next()
  }
}
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(processCors)



require('./articles.js')(app)
require('./profile.js')(app)
require('./auth.js')(app)


require('./following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
