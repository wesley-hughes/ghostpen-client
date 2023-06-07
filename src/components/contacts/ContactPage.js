import { useEffect, useState } from 'react';
import { getContactById, getContacts } from '../../managers/ContactManager';
import { ContactBook } from './ContactBook';
import { ContactForm } from './ContactForm';

export const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    getContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  const handleContactClick = (contactId) => {
    getContactById(contactId)
      .then((contact) => setSelectedContact(contact))
      .catch((error) => console.error('Error retrieving contact:', error));
  };

  const handleFormSave = () => {
    setSelectedContact(null);
    fetchContacts();
  };

  return (
    <div className="contact-page">
      <div className="contact-list">
        <ContactBook
          contacts={contacts}
          handleContactClick={handleContactClick}
        />
      </div>
      <div className="contact-form">
        <ContactForm
          contact={selectedContact}
          onSave={handleFormSave}
        />
      </div>
    </div>
  );
};
