const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');
const auth = require('./auth')
const { isLoggedIn } = require('../utils')

router.use(auth);
router.use(isLoggedIn)

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
})

router.use('/contacts', contacts); // /contacts/search

module.exports = router;
