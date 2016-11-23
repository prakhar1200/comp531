var mongoose = require('mongoose')
var followerSchema = new mongoose.Schema({
	username: String, followers:[]
})

exports.Follower = mongoose.model('follower', followerSchema)
