var mongoose = require('mongoose')
var authSchema = new mongoose.Schema({
	username: String, salt: String, hash: String
})

exports.Auth = mongoose.model('authentication', authSchema)
