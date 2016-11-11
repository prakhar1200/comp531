var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

const app = express()
app.use(session({secret :'someweirdstringthatthebrowsercaresabout' }))
app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser());
var users = []

var config = {
	clientID : '152847905185047',
	clientSecret :'a9b04b6ba5f56126ba0c3a3408d9f8c4',
	callbackURL : 'http://localhost:3000/callback'
}

//serialize the user for the session

passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})

//desiralize the user from session
passport.deserializeUser(function(id , done) {
	var user = users[id]
	done(null, user)

})

passport.use(new FacebookStrategy(config, function(token, refreshToken, profile, done){
	process.nextTick(function() {
	return done(null, profile)
	})
}))

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

function profile(req, res) {
	res.send(req.user)
}

function hello(req, res) {
	res.send('Hello Welcome')
}

function fail(req,  res){
	res.send('Not Authenticated')
}

app.use('/login', passport.authenticate('facebook', {scope : 'email'}))
app.use('/callback', passport.authenticate('facebook', {successRedirect : '/profile', failureRedirect : '/fail'}))
app.use('/profile', isLoggedIn, profile)
app.use('/fail', fail)
app.use('/', hello)

