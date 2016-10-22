

const index = (req, res) => {
     res.send({ hello: 'world' })
}


const getHeadlines = (req, res) => {
	
	 var userList = req.params.user.split(',') 
	 	
	 res.send({ headlines:  userList.map((user) => ({
			username: user || 'sep1',
			headline: 'my headline'
			})
		)	
	})
}	


const putHeadline = (req, res) => {
	res.send({
			username: 'Scott',
			headline: req.body.headline || 'you did not supply it'
		})
}

const getEmail = (req, res) => {
	
	res.send({
		username: 'User'+req.params.user,
		email : 'user'+req.params.user+'@email.com'
	})

}

const putEmail = (req, res) => {
	res.send({
			username: 'Scott',
			email: req.body.email || 'you did not supply it'
		
		})
}

const getZipcode = (req, res) => {
	res.send({
		   username: 'User'+req.params.user,
		   zipcode: '77054'	
		})	
			
}

const putZipcode = (req, res) => {
	res.send({
			username: 'Scott',
			zipcode : req.body.zipcode || 'you did not supply it'
		
		})
}


const getAvatars = (req, res) => {
	 var avatarList = req.params.user.split(',')
	 res.send({ avatars : avatarList.map((avatar) => ({
			username: 'SomeUser'+avatar,
			avatar: 'http://host.com/image/'+ avatar
			}))
})
}	


const putAvatar = (req, res) => {
	res.send({
			username: 'Scott',
			avatar : req.body.avatar || 'you did not supply it'
		
		})
}


module.exports = app => {
     app.get('/', index)
     app.put('/headline', putHeadline)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/avatar', putAvatar)
     app.get('/avatars/:user?', getAvatars)
     app.put('/zipcode', putZipcode)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/email', putEmail)
     app.get('/email/:user?', getEmail)	
	
}








