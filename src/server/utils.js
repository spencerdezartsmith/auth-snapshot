const bcrypt = require('bcrypt')
const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const hashPassword = (myPlaintextPassword, saltRounds) => {
  return bcrypt.hashSync(myPlaintextPassword, saltRounds);
};

module.exports = {renderError, hashPassword}
