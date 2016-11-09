const getFollowing  = (req, res) => {

	res.send({username: req.params.user || "sep1", following: [ "psd3","nsa"]})

}

const putFollowing = (req, res) => {

	res.send({username: "sep1", following: [ "psd3","nsa", req.params.user]})

}

const removeFollowing = (req, res) => {

	res.send({username: "sep1", following: [ "psd3"]})

}



module.exports = app => {
     app.get('/following/:user?', getFollowing)
     app.put('/following/:user',  putFollowing )
     app.delete('/following/:user', removeFollowing )

}