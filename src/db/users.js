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
    .catch(error => {
        console.log ({ error: error.msg })
        throw error
    })
}

module.exports = {
    create
}