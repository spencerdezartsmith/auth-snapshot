const isLoggedIn = (request, response, next) => {
  if (!request.session.user) {
    response.redirect('/login')
  } else {
    response.locals.isLoggedIn = true
    next()
  }
}

const isAdmin = (request, response, next) => {
  const { role } = request.session.user
  if (role === 'admin') {
    response.locals.isAdmin = true
    next()
  } else {
    response.locals.isAdmin = false
    next()
  }
}

module.exports = { isLoggedIn, isAdmin }
