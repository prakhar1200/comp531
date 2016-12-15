const Article = require('./model/article.js').Article
const Follower = require('./model/following.js').Follower
const ObjectId = require('mongodb').ObjectId;
const md5 = require('md5')
const uploadImage = require('./uploadCloudinary')


const addArticle = (req, res) => {
    //Adds a New article to Database
    const newArticle = new Article({
        "author": req.username,
        "text": req.body.text,
        "img": req.fileurl,
        "date": req.body.date || new Date()
    })
    newArticle.save(function(err, savedArticle) {
        !err ? res.send({
            articles: [savedArticle]
        }) : res.send("Failed")
    })
}

const getArticle = (req, res) => {

    if (req.params.id) {
        const requestedArticles = [];
        const requestedID = req.params.id.split(',') || [req.params.id]
            //Find the Articles Requested
        Article.find({
            '_id': {
                $in: requestedID
            }
        }, function(err, articles) {
            !err ? res.send(articles) : res.sendStatus(500)
        });

    } else { //Find the articles for the Logged In  User , Returns Maximum  10 most Recent articles
        Follower.find({
            "username": req.username
        }, (err, followers) => {
            var displayUsers = followers[0].followers
            displayUsers.push(req.username)
            Article.find({
                author: {
                    $in: displayUsers
                }
            }).sort({
                'date': -1
            }).limit(10).exec(function(err, articles) {
                !err ? res.send({
                    articles: articles
                }) : res.sendStatus(500)
            });

        })
    }
}


const putArticle = (req, res) => {
    //If CommentID is present Update Comments
    if (req.body.commentId) {
        if (req.body.commentId === -1) {
            Article.find({
                "_id": ObjectId(req.params.id)
            }, (err, article) => {
                const id = md5(article[0].author + new Date())
                console.log(id)
                Article.update({
                        "_id": ObjectId(req.params.id)
                    }, {
                        $push: {
                            comments: {
                                'commentId': id,
                                'text': req.body.text || "",
                                'author': req.username,
                                'date': new Date()
                            }
                        }
                    })
                    .exec((err, article) => {
                        Article.find({
                            "_id": ObjectId(req.params.id)
                        }, (err, article) => {
                            res.send({
                                articles: article
                            })
                        })
                    })

            })
        } else {
            Article.update({
                    "_id": ObjectId(req.params.id),
                    'comments.commentId': req.body.commentId
                }, {
                    $set: {
                        'comments.$.text': req.body.text
                    }
                })
                .exec((err, article) => {
                    Article.find({
                        "_id": ObjectId(req.params.id)
                    }, (err, article) => {
                        res.send({
                            articles: article
                        })
                    })

                })
        }
    }

    //If only text then update article
    else if (req.body.text) {
        Article.update({
                "_id": ObjectId(req.params.id)
            }, {
                $set: {
                    'text': req.body.text || ""
                }
            })
            .exec((err, article) => {
                Article.find({
                    "_id": ObjectId(req.params.id)
                }, (err, article) => {
                    res.send({
                        articles: article
                    })
                })
            })

    }

}


module.exports = app => {
    app.get('/articles/:id*?', getArticle)
    app.post('/article', uploadImage('articlePic'), addArticle)
    app.put('/articles/:id', putArticle)
}