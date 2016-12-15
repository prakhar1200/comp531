const md5 = require('md5')
const redis = require('redis').createClient('redis://h:p9s4kkvasg2i6jdgv1k8kud6dum@ec2-54-221-228-237.compute-1.amazonaws.com:9739')
const cookieKey = 'sid';
const Profile = require('./model/profile.js').Profile
const Follower = require('./model/following.js').Follower
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

//Configuration To Communicate with Facebook App 
var config = {
    clientID: '152847905185047',
    clientSecret: 'a9b04b6ba5f56126ba0c3a3408d9f8c4',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'picture.type(large)'], //This
    redirectMethod: "meta-refresh"
}


passport.use(new FacebookStrategy(config, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile)
    })
}))


const facebookLogin = function(req, res) {
    Profile.find({
        'email': req.user._json.email,
        'username': req.user._json.first_name + req.user._json.last_name
    }, function(err, foundUser) {
        if (!foundUser.length) {
            //If user is Logging through Facebook for the First Time : Register the User with Authentication type : Facebook
            //Sets Cookie in the REDIS -> Redirects to Frontend 
            const followerList = new Follower({
                "username": req.user._json.first_name + req.user._json.last_name,
                "followers": []
            })
            const newUser = new Profile({
                "username": req.user._json.first_name + req.user._json.last_name,
                "email": req.user._json.email || "default@default.com",
                "dob": new Date(),
                "zipcode": "00000",
                "avatar": req.user._json.picture["data"].url || 'http://res.cloudinary.com/hvnw5ckud/image/upload/v1479865273/wsigtdtipretqxaprsi0.jpg',
                "headline": 'Hello There I am using ShareIt!!',
                "auth": 'facebook'

            })


            newUser.save(function(err, user) {
                followerList.save(function(err, user) {
                    const sessionId = md5(Math.random().toString(36).substring(2, 7) + new Date());
                    redis.set(sessionId, req.user._json.first_name + req.user._json.last_name) //Sets the SessionID to User in REDIS
                    res.cookie(cookieKey, sessionId, {
                        maxAge: 3600 * 1000,
                        httpOnly: false
                    });
                    res.redirect(req.headers.referer)


                })
            })

        } else {
            //Returning User :  Sets Cookie in the REDIS -> Redirects to Frontend 
            const sessionId = md5(Math.random().toString(36).substring(2, 7) + new Date());
            redis.set(sessionId, req.user._json.first_name + req.user._json.last_name) //Sets the SessionID to User in REDIS
            res.cookie(cookieKey, sessionId, {
                maxAge: 3600 * 1000,
                httpOnly: false
            });
            res.redirect(req.headers.referer)


        }
    })

}
module.exports = app => {
    app.get('/auth/facebook', passport.authenticate('facebook', {
        session: false,
        scope: 'email'
    }))
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        session: false
    }), facebookLogin)
}