const router = require('express').Router();
const contacts = require('./contacts')
const adminRoutes = require('./admins')
const auth = require('./auth')
const DbContacts = require('../../models/contacts');
const { isLoggedIn, isAdmin } = require('../middlewares')

router.use(auth)
router.use(isLoggedIn)
router.use(isAdmin)

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts, isAdmin: response.locals.isAdmin })})
    .catch( err => console.log('err', err) )
})
router.use('/contacts', contacts)
router.use('/contacts', adminRoutes)

module.exports = router;
