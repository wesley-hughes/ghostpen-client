import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { getTags } from "../../managers/TagManager";
import { styled } from "@mui/system";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  margin: "auto",
});

export const ContactForm = ({ contact, onSave, handleSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);


  const data = {
    first_name: firstName,
    last_name: lastName,
    bio: bio,
    tags: selectedTags,
  };

  useEffect(() => {
    if (contact !== null) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setBio(contact.bio);
      setSelectedTags(contact.tags.map((tag) => tag.id));
    } else {
      clearForm();
    }
  }, [contact]);

  useEffect(() => {
    getTags()
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error("Error retrieving tags:", error));
  }, []);

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };



  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setBio("");
    setSelectedTags([]);
  };

  return (
    <>
    <div className="contact-page">
      <Dialog maxWidth="sm" fullWidth open={true} onClose={onSave}>
        <DialogTitle>{contact !== null ? "Edit Contact" : "New Contact"}</DialogTitle>
        <DialogContent>
          <FormContainer>
            <TextField
              label="First Name"
              required
              sx={{ mt: 2 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Contact Bio"
              multiline
              required
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <FormControl>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={selectedTags}
                onChange={handleTagChange}
                renderValue={(selected) =>
                  selected
                    .map((tagId) => tags.find((tag) => tag.id === tagId)?.label)
                    .join(", ")
                }
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={onSave}>Cancel</Button>
            <Button type="button" variant="contained" onClick={(e) => handleSubmit(e, data)}>
              {contact !== null ? "Update" : "Create"} Contact
            </Button>
          </FormContainer>
        </DialogContent>
      </Dialog>
      </div>
    </> 
  );
};
