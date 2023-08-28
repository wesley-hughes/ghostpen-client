import React, { useEffect, useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from "@mui/material";
import { getContactById, deleteContact, createContact, updateContact, getContacts } from "../../managers/ContactManager";
import { getTags } from "../../managers/TagManager";
import { ContactForm } from "./ContactForm";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/system";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "auto",
});

export const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editSnackbarOpen, setEditSnackbarOpen] = useState(false);
  const [createSnackbarOpen, setCreateSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);

  const fetchContacts = () => {
    getContacts()
    .then((data) =>
    setContacts(data.sort((a, b) => a.last_name.localeCompare(b.last_name)))
    )
    .catch((error) => console.error("Error fetching contacts:", error))
  };
  
  useEffect(() => {
    fetchContacts();
    fetchTags();
  }, []);

  const fetchTags = () => {
    getTags()
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching tags:", error));
  };

  const handleContactClick = (contactId) => {
    getContactById(contactId)
      .then((contact) => {
        setSelectedContact(contact);
        setIsFormOpen(true);
      })
      .catch((error) => console.error("Error retrieving contact:", error));
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();

    if (selectedContact !== null) {
      updateContact(selectedContact.id, data)
        .then(() => {
          onSave();
          setEditSnackbarOpen(true);
          fetchContacts();
        })
        .catch((error) => console.error("Error updating contact:", error));
    } else {
      createContact(data)
        .then(() => {
          onSave();
          setCreateSnackbarOpen(true);
          fetchContacts();
        })
        .catch((error) => console.error("Error creating contact:", error));
    }
  };

  const onSave = () => {
    setIsFormOpen(false);
    setSelectedContact(null);
  };

  const handleDeleteContact = (contactId) => {
    deleteContact(contactId)
      .then(() => {
        fetchContacts();
        setDeleteSnackbarOpen(true)
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  const filteredContacts = selectedTag
    ? contacts.filter((contact) =>
        contact.tags.some((tag) => tag.label === selectedTag)
      )
    : contacts;

  const searchedContacts = searchTerm
    ? filteredContacts.filter(
        (contact) =>
          contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredContacts;

  return (

    <PageContainer>
      <Button variant="outlined" sx={{ mt: 2 }} startIcon={<AddIcon />} onClick={() => setIsFormOpen(true)}>
        Add Contact
      </Button>

      {isFormOpen && (
        <ContactForm contact={selectedContact ? selectedContact : null} onSave={onSave} fetchContacts={fetchContacts} tags={tags} handleSubmit={handleSubmit} />
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.label}>
                  {tag.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Grid>
      </Grid>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "calc(100vh - 300px)", mt: 2 }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{`${contact.first_name} ${contact.last_name}`}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleContactClick(contact.id)}>
                      <EditOutlinedIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteContact(contact.id)}>
                      <DeleteOutlineIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={editSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setEditSnackbarOpen(false)}
          message="Contact updated successfully"
        />
        <Snackbar
          open={createSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setCreateSnackbarOpen(false)}
          message="Contact created successfully"
        />
        <Snackbar
          open={deleteSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setDeleteSnackbarOpen(false)}
          message="Contact deleted successfully"
        />
      
    </PageContainer>
  );
};
