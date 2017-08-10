const router = require('express').Router()
const User = require('../../models/users')
const { hashPassword, comparePassword } = require('../utils')

router.get('/signup', (request, response) => {
  response.render('auth/signup')
})

router.post('/signup', (request, response) => {
  const { username, password } = request.body
  if (username.length === 0 || password.length === 0) {
    response.render('auth/signup', { error: "Username or Password CANNOT be blank" })
  }
  User.create(username, hashPassword(password, 10))
  .then(user => {
    request.session.user = user;
    response.redirect('/')
  })
  .catch(error => {
    console.log(error.message)
    response.render('auth/signup', { error })
  })
})

router.get('/login',  (request, response) => {
  response.render('auth/login')
})

router.post('/login', (request, response) => {
  const {username, password} = request.body
  User.findUser(username)
    .then(user => {
      if (!user || !(comparePassword(password, user.password))) {
        response.render('auth/login', {error: "Username or Password is invalid" })
      } else {
        request.session.user = user;
        response.redirect('/')
      }
  }
)})

router.get('/logout', (request, response) => {
  request.session.destroy(() => {
    response.redirect('/login')
  })
})

module.exports = router
