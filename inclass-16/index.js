'use strict' 
const express = require('express')
const bodyParser = require('body-parser')
const articles = [{"id":1, "author": 'Scott', "text" :'A post'}, {"id":2, "author": 'Prakhar', "text" :' Awesome post'}, {"id":3, "author": 'Palash', "text" :'JS post'}]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)   
     articles.push({"id":articles.length+1, "author": 'Bean', "text" :req.body})

     res.send(articles[articles.length-1])
}

const getArticle = (req, res) => res.send( JSON.stringify({ "articles" : articles}))

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
