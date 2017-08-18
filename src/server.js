const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const dbContacts = require('./models/db/contacts')
const app = express()
const {renderError} = require('./server/utils')
const routes = require('./server/routes');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.isLoggedIn = false
  response.locals.isAdmin = false
  next()
})

app.use(session({
  store: new pgSession({
    conString: 'postgres://localhost:5432/contacts_development'
  }),
  secret: 'helloworld',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }
}))

app.use('/', routes)

app.use((request, response) => {
  response.render('errors/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
