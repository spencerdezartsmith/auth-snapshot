const db = require('./db')

const create = (username, password) => {
    return db.query (`
    INSERT INTO 
    users (username, password)
    VALUES
    ($1::text, $2::text)
    RETURNING
    username
    `, [username, password])
}

const findUser = (username) => {
 return db.oneOrNone(`
    SELECT
    *
    FROM users
    WHERE
    username = $1
 `, [username])
}

module.exports = {
    create,
    findUser
}