var Profile = require('./model/profile.js').Profile
var Auth = require('./model/auth.js').Auth
const md5 = require('md5')
const uploadImage = require('./uploadCloudinary')
const getHeadlines = (req, res) => {
    //Checks if the Parameters has users, if yes return headlines 
    //else returns for the particular user
    if (req.params.user) {
        var userList = req.params.user.split(',') || req.params.user
        Profile.find({
            'username': {
                $in: userList
            }
        }, (err, users) => {
            res.send({
                headlines: users.map((user) => ({
                    username: user.username,
                    headline: user.headline
                }))
            })
        })
    } else {
        Profile.find({
            'username': req.username
        }, (err, user) => {
            res.send({
                headlines: [{
                    "username": user[0].username,
                    "headline": user[0].headline
                }]
            })
        })
    }
}

//Updates the Headline for LoggedIn User
const putHeadline = (req, res) => {
    Profile.update({
            'username': req.username
        }, {
            $set: {
                'headline': req.body.headline
            }
        })
        .then(r => res.send({
            'username': req.username,
            'headline': req.body.headline
        }))
}

//Send Email for the Logged In user or the requested user in the Params
const getEmail = (req, res) => {
        Profile.find({
            'username': req.params.user || req.username
        }, (err, user) => {
            !err ? res.send({
                username: user[0].username,
                email: user[0].email
            }) : res.send("Failed")
        })
    }
    //Updates email for the LoggedIn User
const putEmail = (req, res) => {
    Profile.update({
            'username': req.username
        }, {
            $set: {
                'email': req.body.email
            }
        })
        .then(r => res.send({
            username: req.username,
            email: req.body.email
        }))
}

//Send Zipcode for the Logged In User or requested User
const getZipcode = (req, res) => {
    Profile.find({
        'username': req.params.user || req.username
    }, (err, user) => {
        !err ? res.send({
            username: user[0].username,
            zipcode: user[0].zipcode
        }) : res.send("Failed")
    })
}

//Update Zipcode for the LoggedIn User
const putZipcode = (req, res) => {
        Profile.update({
            'username': req.username
        }, {
            $set: {
                'zipcode': req.body.zipcode
            }
        }, (err, zip) => {
            res.send({
                username: req.username,
                zipcode: req.body.zipcode
            })
        })
    }
    //Send Avatars for the requested  users in params or the logged in user
const getAvatars = (req, res) => {
    if (req.params.user) {
        var userList = req.params.user.split(',') || req.params.user
        Profile.find({
            'username': {
                $in: userList
            }
        }, (err, users) => {
            res.send({
                avatars: users.map((user) => ({
                    username: user.username,
                    avatar: user.avatar
                }))
            })
        })
    } else {
        Profile.find({
            'username': req.username
        }, (err, user) => {
            res.send({
                avatars: [{
                    "username": user[0].username,
                    "avatar": user[0].avatar
                }]
            })
        })
    }
}

//Update avatar for the LoggedIn User req.fileurl is the link to hosted image on the Cloudinary server
const putAvatar = (req, res) => {
    Profile.update({
        'username': req.username
    }, {
        $set: {
            'avatar': req.fileurl
        }
    }, (err, zip) => {
        res.send({
            username: req.username,
            avatar: req.fileurl
        })
    })

}

//Send the Date of Birth for the Logged In User
const getDob = (req, res) => {
    Profile.find({
        'username': req.username
    }, (err, user) => {
        !err ? res.send({
            "username": user[0].username,
            "dob": user[0].dob
        }) : res.send("Failed")
    })
}

const getAccountType = (req, res) => {
    Profile.find({
        'username': req.username
    }, (err, user) => {
        !err ? res.send({
            username: user[0].username,
            type: user[0].auth
        }) : res.send("Failed")
    })
}


const linkAccount = (req, res) => {


    Profile.update({
            'username': req.username
        }, {
            $set: {
                auth: 'General'
            }
        })
        .exec((err) => {
            const salt = Math.random().toString(36).substring(7);
            const newAuth = new Auth({
                "username": req.username,
                "salt": salt,
                "hash": md5(req.body.password + salt)
            })
            newAuth.save(function(err, user) {
                !err ? res.send({
                    result: 'success',
                    username: user.username,
                    type: 'General'
                }) : res.send("Failed")
            })
        })
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
    app.get('/accountType', getAccountType)
    app.post('/linkAccount', linkAccount)

}