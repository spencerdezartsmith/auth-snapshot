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

const checkPermissions = (request, response, next) => {
  if (response.locals.isAdmin) {
    next()
  } else {
    response.status(403).render('errors/not_authorized')
  }
}

module.exports = { isLoggedIn, isAdmin, checkPermissions }
