const DbContacts = require('../../models/contacts')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/new', (request, response) => {
  if (response.locals.isAdmin) {
    response.render('contacts/new')
  } else {
    response.status(403).render('errors/not_authorized')
  }
})

router.post('/', (request, response, next) => {
  if (response.locals.isAdmin) {
    DbContacts.createContact(request.body)
    .then(function(contact) {
    if (contact) return response.redirect(`/contacts/${contact[0].id}`)
      next()
    })
    .catch( error => renderError(error, response, response) )
  } else {
    response.status(403).render('errors/not_authorized')
  }
})

router.get('/:contactId/delete', (request, response, next) => {
  if (response.locals.isAdmin) {
    const contactId = request.params.contactId
    DbContacts.deleteContact(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch( error => renderError(error, response, response) )
  } else {
    response.status(403).render('errors/not_authorized')
  }
})

module.exports = router
