const router = require('express').Router()
const user = require('../../db/users')

const { hashPassword, comparePassword } = require('../utils')


router.get('/signup', (request, response) => {
    console.log('GET REQUEST')
    response.render('signup')
})

router.post('/signup', (request, response) => {
    const { username, password } = request.body
     if (username.length === 0 || password.length === 0) {
         response.render('signup', { error: "Username or Password CANNOT be blank" })   
     } 
    user.create(username, hashPassword(password, 10))
    .then(user => {
            request.session.user = user;
            response.redirect('/')
    })
    .catch(error => {
        console.log(error.message)
        response.render('signup', { error }) 
    })
    // .then(user => console.log(`User:: ${JSON.stringify(user)}`))
})

router.get('/login',  (request, response) => {
    response.render('login')
})

router.post('/login', (request, response) => {
    const {username, password} = request.body
    user.findUser(username)
    .then(user => {
        if (!user || !(comparePassword(password, user.password))) {
            response.render('login', {error: "Username or Password is invalid" })
        } else {
            response.redirect('/')
        }
    }

    )})


// salt password -- signup
// compared salted password to stored hashed password
//session checker middleware for ALL routes
// login uncessessful redirect and message
module.exports = router

