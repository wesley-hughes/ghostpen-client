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
import { styled } from "@mui/system";
import { getContacts } from "../../managers/ContactManager";
import { addTargetedContacts, createCampaign, getCampaigns } from "../../managers/CampaignManager";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  margin: "auto",
});

export const CampaignForm = () => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [campaignId, setCampaignId] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
getCampaigns(data).then((res) => setCampaigns(res))
  },[])

  const data = {
    label: label,
    description: description
  };

  const targetData = {
    contacts: selectedContacts,
  };

  useEffect(() => {
    getContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error retrieving contacts:", error));
  }, []);

  const handleContactChange = (event) => {
    setSelectedContacts(event.target.value);
  };

  const handleSubmit = () => {
    createCampaign(data).then((res) => setCampaignId(res.id))
    if(campaignId !== "" && selectedContacts.length > 0){
        addTargetedContacts(campaignId, targetData)
    }
  };

  return (
    <>
      <div className="contact-page">
        <FormContainer>
          <TextField
            label="Campaign Name"
            required
            sx={{ mt: 2 }}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <TextField
            label="Campaign Description"
            multiline
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl>
            <InputLabel>Targeted Contacts</InputLabel>
            <Select
              multiple
              value={selectedContacts}
              onChange={handleContactChange}
              renderValue={(selected) =>
                selected
                  .map((contactId) => {
                    const contact = contacts.find((contact) => contact.id === contactId)
                    return contact ? `${contact.first_name} ${contact.last_name}` : "";
                  })
                  .join(", ")
              }
            >
              {contacts.map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.first_name} {contact.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="button"
            variant="contained"
            onClick={(e) => handleSubmit(e, data)}
          >
            Create Campaign
          </Button>
        </FormContainer>
        {/* <div>
            {campaigns.map((cam) => cam.id)}
        </div> */}
      </div>
    </>
  );
};
