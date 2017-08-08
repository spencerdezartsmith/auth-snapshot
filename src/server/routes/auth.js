const router = require('express').Router()
const user = require('../../db/users')

const { hashPassword } = require('../utils')


router.get('/signup', (request, response) => {
    response.render('signup')
})
router.post('/signup', (request, response) => {
    const { username, password } = request.body
     
    user.create(username, hashPassword(password, 10))

    .then(user => {
            request.session.user = user;
            console.log(request.session)
    })
    // .then(user => console.log(`User:: ${JSON.stringify(user)}`))
})

router.get('/login', (request, response) => {
    response.render('login')
})

router.post('/login', (request, response) =>{
    const {username, password} = request.body
    console.log(request.body)
})


// salt password -- signup
// compared salted password to stored hashed password
//session checker middleware for ALL routes
// login uncessessful redirect and message
module.exports = router

