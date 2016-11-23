const Follower = require('./model/following').Follower
//Finds the Follower in Database and returns to the logged in User
const getFollowing  = (req, res) => {
	Follower.find({'username':req.username},(err, user)=> {
		!err?res.send({username: req.username, following: user[0].followers}):res.send("Failed")
	})
}

//Adds a Follower to follower document of the logged in user
const putFollowing = (req, res) => {

	Follower.find({'username':req.params.user},(err, user)=>{
		if(user.length){	
			Follower.update({'username':req.username},{$push:{'followers' : req.params.user}})
			.then(r=>Follower.find({'username':req.username},(err, user)=> {
				!err?res.send({username: req.username, following: user[0].followers}):res.send("Failed")
				})
			)
		}
		else{
		Follower.find({'username':req.username},(err, users) => res.send({username: req.username, following: users[0].followers}))
		}
	})
}

//Removes the Follower for the LoggedIn User
const removeFollowing = (req, res) => {
	Follower.update({'username':req.username},{$pull:{'followers' : req.params.user}})
	.then(r=>Follower.find({'username':req.username},(err, user)=> {
		!err?res.send({username: req.username, following: user[0].followers}):res.send("Failed")
		})
	)
}



module.exports = app => {
     app.get('/following/:user?', getFollowing)
     app.put('/following/:user',  putFollowing )
     app.delete('/following/:user', removeFollowing )
}
