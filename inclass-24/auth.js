const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis').createClient('redis://h:p9s4kkvasg2i6jdgv1k8kud6dum@ec2-54-221-228-237.compute-1.amazonaws.com:9739')
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

const User = [];
const cookieKey = 'sid';

const registerUser =(req, res) => {
     const salt =  Math.random().toString(36).substring(5);
     User.push({"id" : User.length+1 ,"username" : req.body.username, "salt":salt, "hash" : md5(req.body.password+salt)})
     res.send("Registered Successfully");
}


const loginUser =(req, res) => {

	const response =  User.find(function(user) {
		if(user.username === req.body.username)
			{
				return user.hash === md5(req.body.password + user.salt);	
		}
		else {
			return false;
		}
		
	});

	if(typeof(response)==='object') { 
		const sessionId = Math.random().toString(36).substring(2,7);
		redis.set(sessionId, req.body.username) //Sets the SessionID to User in REDIS
		res.cookie(cookieKey,sessionId,{maxAge:3600*1000, httpOnly : true});

		res.send({username : req.body.username, result : "success"}); 
	}
		else { res.sendStatus(401);}
	}

//MiddleWare  that checks if the SessionID in REDIS	
const isLoggedIn = (req, res, next) => {
  	if(req.cookies[cookieKey])  {
  		redis.get(req.cookies[cookieKey], function(err, user ){
  			if(!user){
  				res.sendStatus(401)
  			}
  			else {
				req.username = user
				next();
			}  
 	    })
	}
	else{
  			res.sendStatus(401)
  	}	
}

const logout= (req, res) => {
		res.send("Bye"+req.username)
}

app.post('/register/', registerUser);
app.post('/login', loginUser);	 
app.get('/logout', isLoggedIn, logout); 

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})	
			












