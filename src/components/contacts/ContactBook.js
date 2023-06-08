import { deleteContact, getContacts } from '../../managers/ContactManager';
import { useState, useEffect } from 'react';

export const ContactBook = ({contacts, handleContactClick, fetchContacts }) => {

  const handleDeleteContact = (contactId) => {
    deleteContact(contactId)
      .then(() => {
        fetchContacts()
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <div className="contact-book">
      {contacts.map((contact) => (
        <div key={contact.id}>
          <p onClick={() => handleContactClick(contact.id)}>
            {contact.first_name} {contact.last_name}
          </p>
          <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
