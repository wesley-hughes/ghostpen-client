import { useEffect, useState } from 'react';
import { getContactById, getContacts } from '../../managers/ContactManager';
import { ContactBook } from './ContactBook';
import { ContactForm } from './ContactForm';

export const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formKey, setFormKey] = useState(0); 

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
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="contact-page">
      <div className="contact-list">
        <ContactBook
          contacts={contacts}
          handleContactClick={handleContactClick}
          fetchContacts={fetchContacts}
        />
      </div>
      <div className="contact-form">
        <ContactForm
          key={formKey}
          contact={selectedContact}
          onSave={handleFormSave}
          fetchContacts={fetchContacts}
        />
      </div>
    </div>
  );
};
