


const login = (req, res) => {
	if(req.body.username, req.body.password)
	{
	res.send({username : req.body.username, result: "success"})
	}
	else {
	res.send("Unauthorized")
	}	
}

const register  = (req, res) => {
	
	res.send({result: "success", username : req.body.username})

}

const logout = (req, res) => {
	res.send("OK")
}

module.exports = app => {

     app.post('/login', login)
     app.post('/register', register)
     app.put('/logout', logout)
}
