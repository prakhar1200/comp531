const md5 = require('md5')
const cookieParser = require('cookie-parser')
const cookieKey = 'sid';
const User = [];

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
	console.log(typeof(response));
	if(typeof(response)==='object') { 
		res.cookie(cookieKey,Math.random().toString(36).substring(2,7),{maxAge:3600*1000, httpOnly : true});
		res.send({username : req.body.username, result : "success"}); 
	}
		else { res.sendStatus(401);}
	}
			
module.exports = app => {
     app.post('/register/', registerUser);
     app.post('/login', loginUser);	
}








