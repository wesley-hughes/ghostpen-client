import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { styled } from "@mui/system";
import { ghostInput } from "../../managers/GhostManager";
import { getUserContacts } from "../../managers/ContactManager";
import { getTones } from "../../managers/ToneManager";
import { getUser } from "../../managers/UserManager";
import { createLetter } from "../../managers/LetterManager";
import { Link, useNavigate } from "react-router-dom";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  margin: "auto",
});

const StyledLink = styled(Link)({
  color: "#577046",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

export const LetterCreate = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [tones, setTones] = useState([]);
  const [selectedTones, setSelectedTones] = useState([]);
  const [letterPurpose, setLetterPurpose] = useState("");
  const [letterObj, setLetterObj] = useState(null);
  const [letterLength, setLetterLength] = useState("");
  const [letterSaveSnackbar, setLetterSaveSnackbar] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  useEffect(() => {
    getUserContacts().then((data) => setContacts(data));
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      navigate("/contact");
    }
  }, [contacts, navigate]);

  useEffect(() => {
    getTones().then((data) => setTones(data));
  }, []);

  const handleAIResponseGenerate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userObj = {
        name: user.first_name + " " + user.last_name,
        bio: user.ghostuser.bio,
      };

      const contact = {
        name: selectedContact.first_name + " " + selectedContact.last_name,
        bio: selectedContact.bio,
      };

      const tones = selectedTones.map((tone) => tone.label).join(", ");

      const userInput = `The letter you are writing is from ${userObj.name}. Here is a bio for your reference: ${userObj.bio}.
      It is being written to ${contact.name}. Here is a bio on ${contact.name} for your reference: ${contact.bio}.
      The purpose of the letter is ${letterPurpose} and the tones of the letter should be ${tones}. The length of the letter should be ${letterLength}`;

      const generatedResponse = await ghostInput(userInput);
      setResponse(generatedResponse);

      const currentDate = new Date().toISOString().split("T")[0];
      const newLetterObj = {
        contact: selectedContact.id,
        user: user.id,
        letter_body: generatedResponse,
        date: currentDate,
      };

      setLetterObj(newLetterObj);
      setResponse(generatedResponse);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const clearForm = () => {
    setResponse("");
    setSelectedContact(null);
    setSelectedTones([]);
    setLetterPurpose("");
    setLetterObj(null);
  };

  const handleLetterSave = async (e) => {
    try {
      await createLetter(letterObj);
      clearForm();
      setLetterSaveSnackbar(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleContactChange = (event, value) => {
    setSelectedContact(value);
  };

  const handleToneChange = (event, values) => {
    setSelectedTones(values);
  };

  const sortedContacts = contacts.sort((a, b) =>
    `${a.first_name} ${a.last_name}`.localeCompare(
      `${b.first_name} ${b.last_name}`
    )
  );

  const sortedTones = tones.sort((a, b) => a.label.localeCompare(b.label));

  const lengths = [
    { value: "Short (100 words or less)", label: "Short" },
    { value: "Medium (100-300 words)", label: "Medium" },
    { value: "Long (more than 300 words)", label: "Long" },
  ];

  return (
    <FormContainer onSubmit={handleAIResponseGenerate}>
      {contacts.length === 0 ? (
        <div>
          <Typography variant="body1">
            You don't have any contacts yet, <StyledLink to="/contact">Create Contact</StyledLink>.
          </Typography>

        </div>
      ) : (
        <Autocomplete
          fullWidth
          options={sortedContacts}
          getOptionLabel={(contact) =>
            `${contact.first_name} ${contact.last_name}`
          }
          value={selectedContact}
          onChange={handleContactChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Contact" sx={{ mt: 4 }} />
          )}
          limitTags={4}
        />
      )}

      <Autocomplete
        fullWidth
        multiple
        options={sortedTones}
        getOptionLabel={(tone) => tone.label}
        value={selectedTones}
        onChange={handleToneChange}
        renderInput={(params) => <TextField {...params} label="Select Tones" />}
        limitTags={4}
      />
      <TextField
        fullWidth
        value={letterPurpose}
        onChange={(e) => setLetterPurpose(e.target.value)}
        label="Letter Purpose"
        multiline
        rows={4}
        placeholder="Enter your message"
      />
      <FormControl fullWidth>
        <InputLabel id="letter-length-label">Letter Length</InputLabel>
        <Select
          labelId="letter-length-label"
          value={letterLength}
          onChange={(e) => setLetterLength(e.target.value)}
          label="Letter Length"
        >
          {lengths.map((length) => (
            <MenuItem key={length.value} value={length.value}>
              {length.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="button"
        onClick={(e) => handleAIResponseGenerate(e)}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Generate Letter"}
      </Button>

      {response && (
        <>
          <TextField
            fullWidth
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            label="Edit the letter"
            multiline
            rows={10}
            placeholder="Edit the letter"
            autoFocus
            autoComplete="off"
            inputProps={{ style: { resize: "vertical" } }}
          />
          <Button
            onClick={() => {
              handleLetterSave();
              setLetterSaveSnackbar(true);
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={44} /> : "Save Letter"}
          </Button>
        </>
      )}
      <Snackbar
        open={letterSaveSnackbar}
        autoHideDuration={3000}
        onClose={() => setLetterSaveSnackbar(false)}
        message="Letter saved"
      />
    </FormContainer>
  );
};
