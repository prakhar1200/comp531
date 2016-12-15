const md5 = require('md5')
const redis = require('redis').createClient('redis://h:p9s4kkvasg2i6jdgv1k8kud6dum@ec2-54-221-228-237.compute-1.amazonaws.com:9739')
const Profile = require('./model/profile.js').Profile
const Auth = require('./model/auth.js').Auth
const Follower = require('./model/following.js').Follower

const cookieKey = 'sid';

//This function check if the User is Logged In

const isLoggedIn = (req, res, next) => {

    if (req.cookies[cookieKey]) {
        redis.get(req.cookies[cookieKey], function(err, user) {
            if (!user) {
                res.sendStatus(401)
            } else {
                req.username = user
                next()
            }
        })
    } else {
        res.sendStatus(401)
    }

}

//Register the User if the Username doesn not exist already
const registerUser = (req, res) => {
    Profile.find({
        'username': req.body.username
    }, function(err, foundUser) {
        if (!foundUser.length) {
            const salt = Math.random().toString(36).substring(7);
            const newAuth = new Auth({
                "username": req.body.username,
                "salt": salt,
                "hash": md5(req.body.password + salt)
            })
            const followerList = new Follower({
                "username": req.body.username,
                "followers": [],
                "auth": 'Local'
            })
            const newUser = new Profile({
                "username": req.body.username,
                "email": req.body.email || "Default",
                "dob": req.body.dob || new Date(),
                "zipcode": req.body.zipcode || "",
                "avatar": 'http://res.cloudinary.com/hvnw5ckud/image/upload/v1479865273/wsigtdtipretqxaprsi0.jpg',
                "headline": 'Hello There I am using ShareIt!!',
                "auth": 'Local'
            })
            newAuth.save(function(err, user) {
                followerList.save()
                newUser.save(function(err, user) {
                    !err ? res.send({
                        result: 'success',
                        username: user.username
                    }) : res.send("Failed")
                })
            })
        } else {

            if (foundUser[0].auth === 'facebook') {
                res.send('Account with this Username is already Linked through Facebook ')
            }
            res.send('User already exists. Please Use a Different Username');
        }
    })
}

//Logs the Users In if the Username and Password Match
const loginUser = (req, res) => {

    Auth.find({
        username: req.body.username
    }, (err, user) => {
        if (user.length) {
            if (user[0].hash === md5(req.body.password + user[0].salt)) {
                const sessionId = md5(Math.random().toString(36).substring(2, 7) + new Date());
                redis.set(sessionId, req.body.username) //Sets the SessionID to User in REDIS
                res.cookie(cookieKey, sessionId, {
                    maxAge: 3600 * 1000,
                    httpOnly: false
                });
                res.send({
                    username: req.body.username,
                    result: "success"
                });

            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(401)
        }
    })
}


const updatepassword = (req, res) => {
    //Updates the Password and the Salt
    Auth.find({
        'username': req.username,
        'auth': 'Local'
    }, function(err, user) {
        const salt = Math.random().toString(36).substring(7);
        Auth.update({
                'username': req.username
            }, {
                $set: {
                    'salt': salt,
                    'hash': md5(req.body.password + salt)
                }
            })
            .then(res.send({
                username: req.username,
                status: 'success'
            }))
    })
}

const logout = (req, res) => {
    //Removes Key from REDIS and deletes the browser cookie
    redis.del(req.cookies[cookieKey])
    res.cookie(cookieKey, "", {
        expires: new Date()
    })
    res.sendStatus(200)

}


module.exports = app => {

    app.post('/register', registerUser)
    app.post('/login', loginUser)
    app.use(isLoggedIn) //Middleware to Check if user is LoggedIn
    app.get('/logout', logout)
    app.put('/password', updatepassword)

}