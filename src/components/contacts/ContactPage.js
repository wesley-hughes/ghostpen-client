import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { getContactById, getContacts, deleteContact } from '../../managers/ContactManager';
import { getTags } from '../../managers/TagManager';
import { ContactForm } from './ContactForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
    fetchTags();
  }, []);

  const fetchContacts = () => {
    getContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  const fetchTags = () => {
    getTags()
      .then((data) => setTags(data))
      .catch((error) => console.error('Error fetching tags:', error));
  };

  const handleContactClick = (contactId) => {
    getContactById(contactId)
      .then((contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
      })
      .catch((error) => console.error('Error retrieving contact:', error));
  };

  const handleFormSave = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleDeleteContact = (contactId) => {
    deleteContact(contactId)
      .then(() => {
        fetchContacts();
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const filteredContacts = selectedTag
    ? contacts.filter((contact) => contact.tags.some((tag) => tag.label === selectedTag))
    : contacts;

  return (
    <div className="contact-page">
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleFormSave}>
        Create New Contact
      </Button>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{selectedContact ? 'Edit Contact' : 'New Contact'}</DialogTitle>
        <DialogContent>
          <ContactForm
            contact={selectedContact}
            onSave={() => setIsModalOpen(false)}
            fetchContacts={fetchContacts}
            tags={tags}
            editMode={selectedContact !== null}
          />
        </DialogContent>
      </Dialog>

      <div>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select value={selectedTag} onChange={handleTagChange}>
            <MenuItem value="">All</MenuItem>
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.label}>
                {tag.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="contact-list">
        {filteredContacts.map((contact) => (
          <div key={contact.id}>
            <p>
              {contact.first_name} {contact.last_name}
            </p>
            <Button onClick={() => handleContactClick(contact.id)}>
              <EditOutlinedIcon />
            </Button>
            <Button onClick={() => handleDeleteContact(contact.id)}>
              <DeleteOutlineIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
