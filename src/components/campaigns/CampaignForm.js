import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/system";
import { getContacts } from "../../managers/ContactManager";
import {
  addTargetedContacts,
  createCampaign,
  getCampaigns,
} from "../../managers/CampaignManager";

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
    getCampaigns(data).then((res) => setCampaigns(res));
  }, []);

  const data = {
    label: label,
    description: description,
  };

  const targetData = {
    contacts: selectedContacts,
  };

  useEffect(() => {
    getContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error retrieving contacts:", error));
  }, []);

  const handleContactChange = (event, values) => {
    setSelectedContacts(values);
  };

  const handleSubmit = async () => {
    try {
      const createdCampaign = await createCampaign(data);
      const campaignId = createdCampaign.id;

      if (selectedContacts.length > 0) {
        const targetData = { contacts: selectedContacts };
        await addTargetedContacts(campaignId, targetData);
      }

      setCampaignId(campaignId);
    } catch (error) {
      console.error("Error creating campaign:", error);
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
          <Autocomplete
              multiple
              options={contacts}
              getOptionLabel={(contact) => contact.name}
              value={selectedContacts}
              onChange={handleContactChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Targeted Contacts"
                  sx={{ mt: 2 }}
                  />
                  )}
              limitTags={10}
            />
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
