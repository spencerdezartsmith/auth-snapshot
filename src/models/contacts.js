const db = require('./db/contacts')

const createContact = function(contact){
  return db.createContact(contact)
}

const getContacts = function(){
  return db.getContacts()
}

const getContact = function(contactId){
  return db.getContact(contactId)
}

const deleteContact = function(contactId){
  return deleteContact(contactId)
}

const searchForContact = function(searchQuery){
  return searchForContact(searchQuery)
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact
}
