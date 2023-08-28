import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { styled } from "@mui/system";
import { ghostInput } from "../../managers/GhostManager";
import { getContactById } from "../../managers/ContactManager";
import { getTones } from "../../managers/ToneManager";
import { getUser } from "../../managers/UserManager";
import { createLetter } from "../../managers/LetterManager";
import { Link } from "react-router-dom";
import { getCampaigns } from "../../managers/CampaignManager";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  margin: "auto",
});

const TextContainer = styled("div")({
  marginTop: "24px",
});

const StyledLink = styled(Link)({
  color: "#577046",
  textDecoration: "none",
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
});

export const CampaignLettersCreate = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [tones, setTones] = useState([]);
  const [selectedTones, setSelectedTones] = useState([]);
  const [tonesString, setTonesString] = useState("");
  const [letterPurpose, setLetterPurpose] = useState("");
  const [letterLength, setLetterLength] = useState("");
  const [user, setUser] = useState({});
  const [lettersToWrite, setLettersToWrite] = useState([]);

  //setting up date
  const currentDate = new Date().toISOString().split("T")[0];
  //define strings for different lengths to input after selecting from dropdown
  const lengths = [
    { value: "Short (100 words or less)", label: "Short" },
    { value: "Medium (100-300 words)", label: "Medium" },
    { value: "Long (more than 300 words)", label: "Long" },
  ];
  //sort tones alphabetically so they are organized in dropdown
  const sortedTones = tones.sort((a, b) => a.label.localeCompare(b.label));

  //functions to handle saving letter and changes in form
  const handleLetterSave = (e, lettersToWrite) => {
    for (const letter of lettersToWrite) {
      createLetter(letter);
    }
  };
  const handleCampaignChange = (event, value) => {
    setSelectedCampaign(value);
  };
  const handleToneChange = (event, values) => {
    setSelectedTones(values);
  };

  // get and set user info
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  //get and set user's campaign array
  useEffect(() => {
    getCampaigns().then((data) => setCampaigns(data));
  }, []);
  //get and set tones
  useEffect(() => {
    getTones().then((data) => setTones(data));
  }, []);

  //take tones array from dropdown selection and create string to use in userinput
  useEffect(() => {
    if (selectedTones !== "") {
      setTonesString(selectedTones.map((tone) => tone.label).join(", "));
    }
  }, [selectedTones]);

  //when user selects a campaign, get array of contact id's from campaign object
  //then set contacts to array of contact objects
  useEffect(() => {
    if (selectedCampaign !== null) {
      const fetchContacts = async () => {
        const contactList = await Promise.all(
          selectedCampaign.contacts.map((contactId) =>
            getContactById(contactId)
          )
        );
        setContacts(contactList);
      };
      fetchContacts();
    }
  }, [selectedCampaign]);

  //function to sent user inputs to API and to create letter objects
  const handleAIResponseGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userObj = {
      name: user.first_name + " " + user.last_name,
      bio: user.ghostuser.bio,
    };
    let letterArray = [];
    for (const contact of contacts) {
      const contactObj = {
        name: contact.first_name + " " + contact.last_name,
        bio: contact.bio,
      };
      const userInput = `The letter you are writing is from ${userObj.name}. Here is a bio for your reference: ${userObj.bio}.
        It is being written to ${contactObj.name}. Here is a bio on ${contactObj.name} for your reference: ${contactObj.bio}.
        This letter is for ${selectedCampaign.description}.
        The purpose of the letter is ${letterPurpose} and the tones of the letter should be ${tonesString}. The length of the letter should be ${letterLength}`;
      const generatedResponse = await ghostInput(userInput);
      const newLetterObj = {
        contact: contact.id,
        user: user.id,
        letter_body: generatedResponse,
        date: currentDate,
        campaign: selectedCampaign.id,
      };
      letterArray.push(newLetterObj);
    }
    setLettersToWrite(letterArray);
    setLoading(false);
  };

  return (
    <>
    <FormContainer>
      <Autocomplete
        fullWidth
        options={campaigns}
        getOptionLabel={(campaign) => `${campaign.label}`}
        value={selectedCampaign}
        onChange={handleCampaignChange}
        renderInput={(params) => (
          <TextField {...params} label="Select Campaign" sx={{ mt: 4 }} />
        )}
        limitTags={4}
      />
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
        onClick={(e) => {
          handleAIResponseGenerate(e);
        }}
      >
        Generate Campaign
      </Button>
      {lettersToWrite.length !== 0 ? (
        <Button
          type="button"
          onClick={(e) => {
            handleLetterSave(e, lettersToWrite);
          }}
        >
          Write Campaign
        </Button>
      ) : (
        ""
      )}
      </FormContainer>
    </>
  );
};
