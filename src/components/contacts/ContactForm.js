import { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createContact, updateContact } from '../../managers/ContactManager';
import { getTags } from '../../managers/TagManager';
import { styled } from '@mui/system';


const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '400px',
  margin: 'auto',
});

const Heading = styled(Typography)({
  textAlign: 'center',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '2px',
});

export const ContactForm = ({ contact, onSave, fetchContacts }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contact) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setBio(contact.bio);
      setSelectedTags(contact.tags.map((tag) => tag.id));
      setEditMode(true);
    } else {
      clearForm();
    }
  }, [contact]);

  useEffect(() => {
    getTags()
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error('Error retrieving tags:', error));
  }, []);

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      tags: selectedTags,
    };

    if (editMode) {
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
    setEditMode(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Contact' : 'New Contact'}</DialogTitle>
        <DialogContent>
          <FormContainer onSubmit={handleSubmit}>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <TextField label="Bio" multiline rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
            <FormControl>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={selectedTags}
                onChange={handleTagChange}
                renderValue={(selected) =>
                  selected.map((tagId) => tags.find((tag) => tag.id === tagId)?.label).join(', ')
                }
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editMode ? 'Update' : 'Create'} Contact
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
                };