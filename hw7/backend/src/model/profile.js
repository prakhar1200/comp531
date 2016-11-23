var mongoose = require('mongoose')
var profileSchema = new mongoose.Schema({
	username: String, email: String, dob: Date, zipcode: String, headline:String, avatar:String
})

exports.Profile = mongoose.model('profile', profileSchema)
