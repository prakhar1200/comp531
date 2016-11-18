const profile = {
"username" : "sep1",
"headline" : "my headline",
"email" : "random@email.com",
"zipcode" : "77054",
"avatar" : "pandaa.jpg",
}

const uploadImage = require('./uploadCloudinary')

const getHeadlines = (req, res) => {
	if(req.params.user) {
	 var userList = req.params.user.split(',')  	
	 res.send({ headlines:  userList.map((user) => ({
				username: user,
				headline: user === profile.username? profile.headline : user+' headline'
				}))
			})
	}
	else {
	res.send({"username" : profile.username, "headline": profile.headline})	
	}	
}	


const putHeadline = (req, res) => {
	profile.headline = req.body.headline;
	res.send({"username" : profile.username, "headline": profile.headline})
}


const getEmail = (req, res) => {
	//Check is user is spcified for the request
	if(req.params.user && req.params.user !== profile.user)
	{
	res.send({
		username: 'User'+req.params.user,
		email : 'user'+req.params.user+'@email.com'
	})
	}
	else {
		res.send({username : profile.username, email : profile.email})
	}
	
}

const putEmail = (req, res) => {
	profile.email = req.body.email? req.body.email : profile.email //If email in body then change else avoid change
	res.send({
			username: profile.username,
			email: req.body.email || 'Invalid Email'
		})
}

const  getZipcode = (req, res) => {
	if(req.params.user && req.params.user !== profile.user)
	{
	res.send({
		   username: 'User'+req.params.user,
		   zipcode: '37034'	
		})
	}
	else {
		res.send({username : profile.username, zipcode : profile.zipcode})
	}		
			
}

const putZipcode = (req, res) => {
	profile.zipcode = req.body.zipcode? req.body.zipcode : profile.zipcode//If Zipcode specified then change or else avoid change
	res.send({
			username: profile.username,
			zipcode : req.body.zipcode || 'you did not supply it'
		
		})
	} 

const getAvatars = (req, res) => {
	 if(req.params.user)
	 {
	 var avatarList = req.params.user.split(',')
	 res.send({ avatars : avatarList.map((avatar) => ({
			username: 'SomeUser'+avatar,
			avatar: avatar === profile.username?profile.avatar : 'http://host.com/image/'+ avatar
			}))
	})
	}
	else {
		res.send({"username" : profile.username, "avatar": profile.avatar})	
	}

}	

const putAvatar = (req, res) => {
	profile.avatar = req.fileurl? req.fileurl : profile.avatar
	res.send({
			username: profile.username,
			avatar : req.fileurl || 'you did not supply it'
		})
}


const getDob = (req, res) => {
	res.send({username: "StubUser", dob : "10/01/1993" })
} 


module.exports = app => {
     app.put('/headline', putHeadline)
     app.get('/headlines/:user*?', getHeadlines)
     app.put('/email', putEmail)
     app.get('/email/:user?', getEmail)
     app.put('/zipcode', putZipcode)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/avatar', uploadImage('avatar'), putAvatar)
     app.get('/avatars/:user*?', getAvatars)
     app.get('/dob', getDob)
	
}
