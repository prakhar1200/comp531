
var mongoose = require('mongoose')
require('../db.js')
var commentSchema = new mongoose.Schema({
	commentId: String, author: String, date: Date, text: String
})
var articleSchema = new mongoose.Schema({
	 author: String, img: String, date: Date, text: String,
	comments: [commentSchema]
})
exports.Article = mongoose.model('article', articleSchema)
