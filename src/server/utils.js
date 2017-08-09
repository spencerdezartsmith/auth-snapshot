const bcrypt = require('bcryptjs')

const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const hashPassword = (myPlaintextPassword, saltRounds) => {
  return bcrypt.hashSync(myPlaintextPassword, saltRounds);
};

const isLoggedIn = (request, response, next) => {
  if (!request.session.user) {
    response.redirect('/login')
  } else {
    response.locals.isLoggedIn = true;
    next()
  }
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {renderError, hashPassword, isLoggedIn, comparePassword}
