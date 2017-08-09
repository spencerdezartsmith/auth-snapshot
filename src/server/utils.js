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

  }

}

const comparePassword = (password, hash) => {
  // console.log(`User:: ${JSON.stringify(user)}, password:: ${password} `)
  return bcrypt.compareSync(password, hash)
}


module.exports = {renderError, hashPassword, isLoggedIn, comparePassword}
