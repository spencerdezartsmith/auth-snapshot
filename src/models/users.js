const db = require('./db/users')

const create = (username, password) => {
  return db.create(username, password)
}

const findUser = (username) => {
  return db.findUser(username)
}

module.exports = {
    create,
    findUser
}
