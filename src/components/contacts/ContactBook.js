import { deleteContact, getContacts } from '../../managers/ContactManager';
import { useState, useEffect } from 'react';

export const ContactBook = ({ handleContactClick }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    getContacts()
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error('Error retrieving contacts:', error);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  const handleDeleteContact = (contactId) => {
    deleteContact(contactId)
      .then(() => {
        fetchContacts();
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <div className="contact-book">
      {contacts.map((contact) => (
        <div key={contact.id} onClick={() => handleContactClick(contact.id)}>
          <p>
            {contact.first_name} {contact.last_name}
          </p>
          <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
