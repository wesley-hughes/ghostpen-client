import { useState, useEffect } from 'react';
import { createContact, updateContact } from '../../managers/ContactManager';
import { getTags } from '../../managers/TagManager';

export const ContactForm = ({ contact, onSave, fetchContacts }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (contact) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setBio(contact.bio);
      setSelectedTags(contact.tags.map(tag => tag.id));
    }
  }, [contact]);

  useEffect(() => {
    getTags()
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error('Error retrieving tags:', error));
  }, []);

  const handleTagChange = (tagId) => {
    const isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((id) => id !== tagId)
      );
    } else {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tagId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      tags: selectedTags,
    };

    if (contact) {
        updateContact(contact.id, data)
          .then(() => {
            onSave();
            window.alert('Contact Updated');
            clearForm();
            fetchContacts();
          })
          .catch((error) => console.error('Error updating contact:', error));
      } else {
        createContact(data)
          .then(() => {
            onSave();
            window.alert('Contact Created');
            clearForm();
            fetchContacts();
          })
          .catch((error) => console.error('Error creating contact:', error));
      }
    };
  
  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setBio('');
    setSelectedTags([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
      </label>
      <label>
        Tags:
        {tags.map((tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              value={tag.id}
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
            />
            <span>{tag.label}</span>
          </div>
        ))}
      </label>
      <button type="submit">{contact ? 'Update' : 'Create'} Contact</button>
    </form>
  );
};
